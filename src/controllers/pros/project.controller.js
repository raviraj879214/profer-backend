const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 
const emailHeader = require("../../lib/templates/partials/emailHeader");
const emailFooter = require("../../lib/templates/partials/emailFooter");
const sendEmail = require('../../lib/emailService');


exports.getprojectdetailsbyprosid = async (req,res)=>{
    try {
     const { id } = req.params;
     console.log("user id",id);
     const projectdetails = await prisma.project.findMany({
                where: {
                    status: 0,
                     prosId: {
                        contains: id.toString() // since prosId is stored like "5,6"
                    }
                },
                select: {
                    id: true,
                    projectTitle: true,
                    propertyType: true,
                    enddate: true,
                    budget: true,
                    prosId: true,
                    bids: true // include all fields of bids
                },
                orderBy: {
                    enddate: 'desc'
                }
                });

        if(projectdetails){
            res.json({status : 200 ,message : "project details fetched successfully" , data : projectdetails });
        }
        else{
            res.json({status : 200 ,message : "project not fetched successfully"});
        }
    } catch (error) {
        res.json({ status : 500 , message : error.message});
    }
}





exports.makebidbypro = async (req, res) => {
  try {
    const { amount, message, projectId, proId } = req.body;

    const createbid = await prisma.Bid.create({
      data: {
        amount: parseInt(amount),   // Ensure integer
        message: message || null,   // Optional field
        status: 0,
        projectId: projectId,
        proId : parseInt(proId)
      },
    });

    const projectdetails = await prisma.Project.findUnique({
      where : { id : projectId }
    });

    await sendEmail({
        to: `${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`,
        subject: "New Bid Placed on Your Project",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 6px; overflow: hidden;">
            ${emailHeader()}

            <div style="padding: 20px;">
              <h2 style="color: #333;">New Bid Notification</h2>
              <p>Hi Admin,</p>
              <p>One of your Pros has placed a bid on a project. Here are the project details:</p>

              <ul style="line-height: 1.6; color: #555;">
                <li><strong>Project Title:</strong> ${projectdetails.projectTitle}</li>
                <li><strong>Work Description:</strong> ${projectdetails.workDescription}</li>
              </ul>

              <p style="margin-top: 20px; color: #999;">Please log in to the admin panel to review the bid.</p>
            </div>

            ${emailFooter()}
          </div>
        `
      });

        



    res.json({ status: 200, message: "Bid created successfully", data: createbid });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};
