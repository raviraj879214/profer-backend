const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 

exports.createRoofingRequest = async (req, res) => {
  try {
    const { 
      fullName, phone, email, preferredContact,
      propertyType, propertySize, address, buildingAge,
      serviceNeeded, roofType, problemDescription,
      urgency
    } = req.body;

    // Map uploaded file URLs
    const photoUrls = req.files?.map(file => 
      `${req.protocol}://${req.get("host")}/uploads/roofing/${file.filename}`
    ) || [];

    // Save to database
    const newRequest = await prisma.roofingRequest.create({
      data: {
        fullName,
        phone,
        email,
        preferredContact,
        propertyType,
        propertySize,
        address,
        buildingAge: buildingAge ? parseInt(buildingAge) : null,
        serviceNeeded,
        roofType,
        problemDescription,
        urgency,
        photoUrls,
      },
    });

    return res.status(201).json({
      message: "Roofing request created successfully",
      request: newRequest
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};





exports.getRoofingRequests = async (req, res) => {
  try {
    const requests = await prisma.roofingRequest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return res.json({status : 200 ,requests});
  } catch (error) {
    console.error(error);
    return res.json({ status : 500, message: "Internal Server Error", error: error.message });
  }
}