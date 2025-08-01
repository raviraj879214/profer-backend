

const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 



exports.getbusinessdetails = async (req, res) => {
  try {
    const { UserID } = req.params;

      const businessdetails = await prisma.ProBusinessDetails.findMany({
          where: { userId: Number(UserID) },
          select: {
              streetAddress: true,
              city: true,
              state: true,
              zip: true,
              companyName: true,
              companyLogo :true

          },
      });

    if (businessdetails.length > 0) {
      return res.json({
        status: 200,
        message: "Business details fetched successfully",
        data: businessdetails,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Business not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

