const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 

const emailHeader = require("../../lib/templates/partials/emailHeader");
const emailFooter = require("../../lib/templates/partials/emailFooter");
const sendEmail = require('../../lib/emailService');




exports.createProject = async (req, res) => {
  try {
    const { 
      fullName, phoneNumber, emailAddress, status,
      budget, projectTitle, projectAddress, projectDetails,
      productType, productColor, productPreference,
      workDescription ,prosId , startdate , enddate, propertyType
    } = req.body;

       console.log("prosId" , prosId);


           const drawings = req.files['drawings']?.[0] || null;
          const insurance = req.files['insurance']?.[0] || null;
          const projectOther = req.files['projectother']?.[0] || null;
          const mediaFiles = req.files['mediaFiles'] || [];

          // Build all files array for DB with full URL
          const allFiles = [];
          const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/roofing`;

          if (drawings) {
            allFiles.push({
              fileType: 'drawings',
              originalName: drawings.originalname,
              fileUrl: `${baseUrl}/${drawings.filename}`,
            });
          }
          if (insurance) {
            allFiles.push({
              fileType: 'insurance',
              originalName: insurance.originalname,
              fileUrl: `${baseUrl}/${insurance.filename}`,
            });
          }
          if (projectOther) {
            allFiles.push({
              fileType: 'projectother',
              originalName: projectOther.originalname,
              fileUrl: `${baseUrl}/${projectOther.filename}`,
            });
          }
          mediaFiles.forEach(file => {
            allFiles.push({
              fileType: 'mediaFiles',
              originalName: file.originalname,
              fileUrl: `${baseUrl}/${file.filename}`,
            });
          });


    // if (allFiles.length === 0) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: "At least one file (drawing, insurance, project documents, or media) is required."
    //   });
    // }
    // Save roofing request with related files
    const newRequest = await prisma.Project.create({
      data: {
        fullName,
        phoneNumber,
        emailAddress,
        projectTitle,
        projectAddress,
        projectDetails,
        productType,
        productColor,
        productPreference,
        workDescription,
        budget : parseFloat(budget),
        status : parseInt(status),
        prosId : prosId,
        startdate: startdate ,
        enddate: enddate ,
        propertyType,
        documents: {
          create: allFiles
        }
      },
      include: { documents: true }
    });
    
      const prosIdsd = (prosId || "")
        .split(",")
        .map(id => parseInt(id.trim()))
        .filter(id => !isNaN(id));

        console.log("prosIdsd", prosIdsd);

        if (prosIdsd.length > 0) {
            const companyDetails = await prisma.ProBusinessDetails.findMany({
              where: { 
                userId: { in: prosIdsd } 
              },
              select: { companyName: true, companyEmail: true } // fetch only needed fields
            });

            if (companyDetails.length > 0) {
              for (const element of companyDetails) {
                await sendEmail({
                  to: element.companyEmail, // Send to each company's email
                  subject: "A New Project Has Been Assigned to You",
                  html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 6px; overflow: hidden;">
                      ${emailHeader()}

                      <div style="padding: 20px;">
                        <h2 style="color: #333;">New Project Assigned</h2>
                        <p>Dear ${element.companyName || "Company"},</p>
                        <p>We are pleased to inform you that a new project has been assigned to your company. You can review the project details and place your bid directly from your dashboard.</p>
                        
                        <a href="${process.env.FRONTEND_PUBLIC_URL}/sign-in" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px;">
                          Go to Login
                        </a>

                        <p>If you have any questions or need assistance, please contact our support team.</p>
                        <p style="color: #999;">Thanks,<br/>The YourCompany Team</p>
                      </div>

                      ${emailFooter()}
                    </div>
                  `
                });
              }
            } else {
              console.log("No companies found for provided IDs.");
            }
          } else {
            console.log("No valid IDs provided.");
          }










    return res.json({status : 200,message: "Project created successfully",data: newRequest});
  } 
  catch (error) 
  {
    console.log("error message",error.message);
    return res.json({status : 500,message: "Internal Server Error", error: error.message });
  }
};




exports.getProjectlist = async (req, res) => {
  try {


    const projects = await prisma.Project.findMany({
  orderBy: { createdAt: 'desc' },
  include: { documents: true }, // keep your documents
});

const projectsWithUsers = await Promise.all(
  projects.map(async (project) => {
    const ids = project.prosId
      ? project.prosId.split(',').map((id) => parseInt(id))
      : [];

    const pros = ids.length
      ? await prisma.ProBusinessDetails.findMany({
          where: { userId: { in: ids } },
        })
      : [];

    return { 
      ...project, 
      pros, // add users
      documents: project.documents // keep documents
    };
  })
);

    console.log(projectsWithUsers);

    return res.json({status : 200 ,data : projectsWithUsers});
  } catch (error) {
    console.error(error);
    return res.json({ status : 500, message: "Internal Server Error", error: error.message });
  }
}



exports.deleteRoofingRequest = async (req, res) => {
  try {
    const { id } = req.params; // Example: "1,2,3,4,5"
    const ids = id.split(',').map(num => parseInt(num, 10)).filter(Boolean); // Convert to array & remove invalid

    console.log("Deleting roofing requests with IDs:", ids);

    if (ids.length === 0) {
      return res.json({ status: 400, message: "No valid IDs provided" });
    }
    // Check if records exist
    const existingRequests = await prisma.roofingRequest.findMany({
      where: { id: { in: ids } },
    });
    if (existingRequests.length === 0) {
      return res.json({ status: 404, message: "No roofing requests found for provided IDs" });
    }

    // Delete multiple
    await prisma.roofingRequest.deleteMany({
      where: { id: { in: ids } },
    });
    return res.json({status: 200,message: "Roofing request(s) deleted successfully",deletedCount: existingRequests.length});
  } 
  catch (error)
  {
    return res.json({status: 500,message: "Internal Server Error",error: error.message});
  }
};





exports.getcompanyinformation = async (req,res)=>{
  try {
    

    


     const companies = await prisma.ProBusinessDetails.findMany({
        select: {
          userId: true,
          companyName: true,
          companyLogo: true,
        },
      });

      if(companies){
        res.json({status : 200 , message : "companies fetched successfully" , data : companies });
      }
      else{
          res.json({status : 400 , message : "companies not found" });
      }

  } catch (error) {
    res.json({status : 200 , message : error.message });
  }
}




exports.getbidlist = async (req, res) => {
  try {
    const { projecId } = req.body;

    // Step 1: Get all bids
    const bidlist = await prisma.bid.findMany({
      where: { 
        projectId: parseInt(projecId)
      }
    });

    if (bidlist.length === 0) {
      return res.json({ status: 200, message: "No bids found", data: [] });
    }

    // Extract all proIds from bids
    const proIds = bidlist.map(bid => bid.proId);

    // Step 2: Fetch company details for all proIds
    const companyDetailsList = await prisma.proBusinessDetails.findMany({
      where: { userId: { in: proIds } }
    });

    // Step 3: Merge bid with company details
    const result = bidlist.map(bid => ({
      ...bid,
      companyDetails: companyDetailsList.find(cd => cd.userId === bid.proId) || null
    }));

    res.json({ status: 200, message: "Bid list fetched successfully", data: result });

  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};




exports.projectupdatestatus = async (req, res) => {
  try {
    let { projectid, status } = req.body;

    // Validate inputs
    if (!projectid || status === undefined) {
      return res.json({ status: 400, message: "Project ID and Status are required" });
    }

    projectid = parseInt(projectid);
    status = parseInt(status);

    if (isNaN(projectid) || isNaN(status)) {
      return res.json({ status: 400, message: "Invalid Project ID or Status" });
    }

    const project = await prisma.project.update({
      where: { id: projectid },
      data: { status }
    });

    if (project) {
      res.json({ status: 200, message: "Project status updated" });
    } else {
      res.json({ status: 404, message: "Project not found" });
    }
  } catch (error) {
    console.error(error);
    res.json({ status: 500, message: error.message });
  }
};





exports.deleteprojectlist = async (req, res) => {
  try {
    const { id } = req.params; // Example: "1,2,3,4,5"
    const ids = id.split(',').map(num => parseInt(num, 10)).filter(Boolean); // Convert to array & remove invalid

    console.log("Deleting roofing requests with IDs:", ids);

    if (ids.length === 0) {
      return res.json({ status: 400, message: "No valid IDs provided" });
    }
    // Check if records exist
    const existingRequests = await prisma.Project.findMany({
      where: { id: { in: ids } },
    });
    if (existingRequests.length === 0) {
      return res.json({ status: 404, message: "No roofing requests found for provided IDs" });
    }

    // Delete multiple
    await prisma.Project.deleteMany({
      where: { id: { in: ids } },
    });
    return res.json({status: 200,message: "Roofing request(s) deleted successfully",deletedCount: existingRequests.length});
  } 
  catch (error)
  {
    return res.json({status: 500,message: "Internal Server Error",error: error.message});
  }
};