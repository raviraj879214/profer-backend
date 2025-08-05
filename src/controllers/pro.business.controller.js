const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const parseToArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return val.split(',').map(s => s.trim()).filter(Boolean);
};

exports.createprosBusinessRequest = async (req, res) => {
  try {
    const {
      userId,
      companyName, companyPhone, companyEmail,
      streetAddress, city, state, zip, ein,
      ownerFirstName, ownerLastName, ownerEmail,
      services, qualifications
    } = req.body;

    const parsedUserId = parseInt(req.body.userId, 10);

    if (!parsedUserId) {
      return res.status(400).json({ message: "Invalid or missing userId" });
    }

    const baseUrl = process.env.Next_PUBLIC_BACKEND_URL;

    const companyLogo = req.files['companyLogo']?.[0]
      ? `${baseUrl}/uploads/prosbusiness/${req.files['companyLogo'][0].filename}`
      : null;

    const ownerLicense = req.files['ownerLicense']?.[0]
      ? `${baseUrl}/uploads/prosbusiness/${req.files['ownerLicense'][0].filename}`
      : null;

      


    const upsertedBusiness = await prisma.proBusinessDetails.upsert({
      where: { userId: parsedUserId },
      update: {
        companyName,
        companyPhone,
        companyEmail,
        streetAddress,
        city,
        state,
        zip,
        ein,
        ownerFirstName,
        ownerLastName,
        ownerEmail,
        services: JSON.stringify(parseToArray(services)),
        qualifications: JSON.stringify(parseToArray(qualifications)),
        ...(companyLogo && { companyLogo }),
        ...(ownerLicense && { ownerLicense })
      },
      create: {
        userId: parsedUserId,
        companyName,
        companyPhone,
        companyEmail,
        streetAddress,
        city,
        state,
        zip,
        ein,
        ownerFirstName,
        ownerLastName,
        ownerEmail,
        services: JSON.stringify(parseToArray(services)),
        qualifications: JSON.stringify(parseToArray(qualifications)),
        companyLogo,
        ownerLicense,
       
      }
    });

    return res.status(200).json({
      message: "Business details saved successfully",
      business: upsertedBusiness
    });

  } catch (error) {
    console.log("Business request error:", error);
    return res.status(500).json({ message: error.message, stack: error.stack });
  }
};


exports.getProsBusinessRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const business = await prisma.proBusinessDetails.findUnique({
      where: { userId: Number(userId) },
    });
    if (!business) return res.status(404).json({ message: "No business details found" });
    res.json({ business });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};





