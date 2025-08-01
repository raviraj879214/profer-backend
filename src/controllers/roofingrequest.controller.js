const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 



exports.createRoofingRequest = async (req, res) => {
  try {
    const { 
      fullName, phoneNumber, emailAddress, preferredContactMethod,
      preferredCallingTime, projectTitle, projectAddress, projectDetails,
      productType, productColor, productPreference,
      workDescription
    } = req.body;

         const drawings = req.files['drawings']?.[0] || null;
          const insurance = req.files['insurance']?.[0] || null;
          const projectOther = req.files['projectother']?.[0] || null;
          const mediaFiles = req.files['mediaFiles'] || [];

          // Build all files array for DB with full URL
          const allFiles = [];
          const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/roofing`;

          if (drawings) {
            allFiles.push({
              fileType: 'drawing',
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
              fileType: 'projectOther',
              originalName: projectOther.originalname,
              fileUrl: `${baseUrl}/${projectOther.filename}`,
            });
          }
          mediaFiles.forEach(file => {
            allFiles.push({
              fileType: 'media',
              originalName: file.originalname,
              fileUrl: `${baseUrl}/${file.filename}`,
            });
          });


    // Save roofing request with related files
    const newRequest = await prisma.roofingRequest.create({
      data: {
        fullName,
        phoneNumber,
        emailAddress,
        preferredContactMethod,
        preferredCallingTime,
        projectTitle,
        projectAddress,
        projectDetails,
        productType,
        productColor,
        productPreference,
        workDescription,
        files: {
          create: allFiles
        }
      },
      include: { files: true }
    });

    return res.json({status : 200,message: "Roofing request created successfully",data: newRequest});
  } 
  catch (error) 
  {
    console.log("error message",error.message);
    return res.json({status : 500,message: "Internal Server Error", error: error.message });
  }
};




exports.getRoofingRequests = async (req, res) => {
  try {
     const requests = await prisma.roofingRequest.findMany({
      orderBy: { createdAt: 'desc' },
     include: { files: true }
    });

    return res.json({status : 200 ,data : requests});
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

