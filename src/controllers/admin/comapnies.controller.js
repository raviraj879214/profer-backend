
const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 
const emailHeader = require("../../lib/templates/partials/emailHeader");
const emailFooter = require("../../lib/templates/partials/emailFooter");
const sendEmail = require('../../lib/emailService');



exports.getcompaniesregistrationbystatus= async (req,res)=>{
    try
    {
     const {status} = req.params;

      const comapniesregisteration = await prisma.user.findMany({
            where: { status: status ,roleId : 4 },
            include: {
                businessDetails: true,
                subscriptions: true,
                credentials : true
            }
            });


        if(comapniesregisteration){
            res.json({ status : 200 , comapniesregisteration});
        }
        else{
            res.json({status : 400 ,message :"no companies found"});
        }
    }
    catch(erro)
    {
        res.json({status : 500 , message : erro.message });
    }
}





exports.approvecompanies = async (req, res) => {
  try {
    const { id } = req.params; // Example: "1,2,3,4,5"
    const ids = id.split(',').map(num => parseInt(num, 10)).filter(Boolean); // Convert to array & remove invalid

    console.log("approving roofing requests with IDs:", ids);

    if (ids.length === 0) {
      return res.json({ status: 400, message: "No valid IDs provided" });
    }
    // Check if records exist
    const existingRequests = await prisma.user.findMany({
      where: { id: { in: ids } },
    });
    if (existingRequests.length === 0) {
      return res.json({ status: 404, message: "No roofing requests found for provided IDs" });
    }

   

    existingRequests.forEach(async (element) => {
        console.log("email", element.email);

        await sendEmail({
          to: element.email, // Send to each user's email
          subject: "Your Account Has Been Approved",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 6px; overflow: hidden;">
              ${emailHeader()}

              <div style="padding: 20px;">
                <h2 style="color: #333;">Account Approved</h2>
                <p>Dear ${element.firstname || "User"},</p>
                <p>We’re pleased to inform you that your account has been approved by our admin team. You can now log in and access all features.</p>
                
                <a href="${process.env.FRONTEND_PUBLIC_URL}/sign-in" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px;">
                    Go to Login
                  </a>


                <p>If you did not request this account or need assistance, please contact our support team.</p>
                <p style="color: #999;">Thanks,<br/>The YourCompany Team</p>
              </div>

              ${emailFooter()}
            </div>
          `
        });
      });




    // Delete multiple
    await prisma.user.updateMany({
        where: { 
            id: { in: ids }  // array of IDs
        },
        data: { status: "4" } 
        });

    return res.json({status: 200,message: "Roofing request(s) deleted successfully",deletedCount: existingRequests.length});
  } 
  catch (error)
  {
    return res.json({status: 500,message: "Internal Server Error",error: error.message});
  }
};




exports.blockcompanies = async (req, res) => {
  try {
    const { id } = req.params; // Example: "1,2,3,4,5"
    const ids = id.split(',').map(num => parseInt(num, 10)).filter(Boolean); // Convert to array & remove invalid

    console.log("block roofing requests with IDs:", ids);

    if (ids.length === 0) {
      return res.json({ status: 400, message: "No valid IDs provided" });
    }
    // Check if records exist
    const existingRequests = await prisma.user.findMany({
      where: { id: { in: ids } },
    });
    if (existingRequests.length === 0) {
      return res.json({ status: 404, message: "No roofing requests found for provided IDs" });
    }

    existingRequests.forEach(async (element) => {
        console.log("email", element.email);

        await sendEmail({
          to: element.email, // Send to each user's email
          subject: "Your Account Has Been Blocked",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 6px; overflow: hidden;">
              ${emailHeader()}

              <div style="padding: 20px;">
                <h2 style="color: #d9534f;">Account Blocked</h2>
                <p>Dear ${element.firstname || "User"},</p>
                <p>We regret to inform you that your account has been blocked by our admin team.</p>
                <p>If you believe this action was taken in error or need more details, please contact our support team.</p>
                <p style="color: #999;">Thanks</p>
              </div>

              ${emailFooter()}
            </div>
          `
        });
      });


    // Delete multiple
    await prisma.user.updateMany({
        where: { 
            id: { in: ids }  // array of IDs
        },
        data: { status: "5" } 
        });

    return res.json({status: 200,message: "Roofing request(s) deleted successfully",deletedCount: existingRequests.length});
  } 
  catch (error)
  {
    return res.json({status: 500,message: "Internal Server Error",error: error.message});
  }
};




exports.unblockcompanies = async (req, res) => {
  try {
    const { id } = req.params; // Example: "1,2,3,4,5"
    const ids = id.split(',').map(num => parseInt(num, 10)).filter(Boolean); // Convert to array & remove invalid

    console.log("un block roofing requests with IDs:", ids);

    if (ids.length === 0) {
      return res.json({ status: 400, message: "No valid IDs provided" });
    }
    // Check if records exist
    const existingRequests = await prisma.user.findMany({
      where: { id: { in: ids } },
    });
    if (existingRequests.length === 0) {
      return res.json({ status: 404, message: "No roofing requests found for provided IDs" });
    }

    existingRequests.forEach(async (element) => {
      console.log("email", element.email);

    await sendEmail({
      to: element.email, // Send to each user's email
      subject: "Your Account Has Been Unblocked",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 6px; overflow: hidden;">
          ${emailHeader()}

          <div style="padding: 20px;">
            <h2 style="color: #28a745;">Account Unblocked</h2>
            <p>Dear ${element.firstname || "User"},</p>
            <p>Good news! Your account has been reviewed and successfully unblocked by our admin team. You can now log in and continue using our services.</p>

            <a href="${process.env.FRONTEND_PUBLIC_URL}/sign-in" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #28a745; color: #ffffff; text-decoration: none; border-radius: 4px;">
              Go to Login
            </a>

            <p style="color: #999;">Thanks,<br/>The YourCompany Team</p>
          </div>

          ${emailFooter()}
        </div>
      `
    });
  });












    // Delete multiple
    await prisma.user.updateMany({
        where: { 
            id: { in: ids }  // array of IDs
        },
        data: { status: "4" } 
        });

    return res.json({status: 200,message: "Roofing request(s) deleted successfully",deletedCount: existingRequests.length});
  } 
  catch (error)
  {
    return res.json({status: 500,message: "Internal Server Error",error: error.message});
  }
};