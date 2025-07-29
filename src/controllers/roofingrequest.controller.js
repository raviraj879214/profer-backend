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

