
const { PrismaClient } = require('@prisma/client'); 
const { json } = require('express');
const prisma = new PrismaClient(); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../lib/emailService');
const emailHeader = require("../lib/templates/partials/emailHeader");
const emailFooter = require("../lib/templates/partials/emailFooter");



exports.createuserandsendotp = async (req, res) => {
  try {
    const { emailaddress, status } = req.body;

    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();

    // Check if user exists

    const checkemailinusertable = await prisma.user.findUnique({ where: { email : emailaddress }});
    if(checkemailinusertable){
       return res.json({ status: 400, message: "email already existed please try other" });
    }


    const usercheck = await prisma.TempUser.findUnique({ where: { emailaddress } });

    
    if (usercheck) {
      // Update OTP if user exists
      await prisma.TempUser.update({
        where: { emailaddress },
        data: { otp }
      });
    } else {
      // Create new user
      await prisma.TempUser.create({
        data: { emailaddress, otp, status }
      });
    }

    // Send OTP email
    const emailsent = await sendEmail({
      to: emailaddress,  // FIXED: use correct variable
      subject: "Your OTP Code for Verification",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 6px;">
        ${emailHeader()}

          <h2 style="color: #333;">One-Time Password (OTP)</h2>
          <p>Your One-Time Password (OTP) for verification is:</p>
          <div style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #007bff;">
            ${otp}
          </div>
          <p>This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
          <p>If you did not request this, you can safely ignore this email.</p>
          <p style="color: #999;">Thanks,<br/>The YourCompany Team</p>

        ${emailFooter()}
        </div>`
    });

    if (!emailsent.success) {
      return res.json({ status: 500, message: "Failed to send email" });
    }

    return res.json({
      status: 200,
      message: usercheck ? 'Otp updated and sent' : 'User created and Otp sent',
      email: emailaddress,
      otp
    });

  } catch (error) {
    res.json({
      status: 500,
      error: 'Error creating user and sending OTP',
      details: error.message
    });
  }
};





exports.createcheckout = async (req, res) => {
    try {
        const { emailaddress, address, city, state, zipCode ,firstname,lastname ,status , password } = req.body;

        const user = await prisma.TempUser.findUnique({ where: { emailaddress } });

        if (user) {


            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("password",password,hashedPassword);
           const checkout = await prisma.TempUser.update({
                where: { emailaddress },
                data: { address, city, state, zipCode ,firstname,lastname ,status ,password : hashedPassword }
            });


            return res.json({
                status: 200,
                message: 'Checkout updated successfully',
                checkout
            });
        } else {
            return res.json({
                status: 404,
                error: 'User not found',
                emailaddress
            });
        }
    } catch (error) {
        res.json({ status: 500, error: 'Error updating checkout', details: error.message });
    }
};



exports.getprosuserdetails = async (req, res) => {
    try {
        const { emailaddress } = req.params; // <-- use params instead of body
        if (!emailaddress) {
            return res.json({ status: 400, message: "Email is required" });
        }

        const user = await prisma.TempUser.findUnique({ where: { emailaddress } });
        if (user) {
            res.json({ status: 200, message: "pros fetched successfully", data: user });
        } else {
            res.json({ status: 400, message: "pros data not found" });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
};


exports.updateprospaymentdetails = async (req, res) => {
    try {
        const { emailaddress, paymentintentid , status } = req.body;
        console.log("Email" , emailaddress);
        console.log("pid",paymentintentid);
        console.log("status",status);
        // Check if user exists
        const user = await prisma.TempUser.findUnique({
            where: { emailaddress }
        });

         const startdate = new Date();
        const enddated = new Date();
        enddated.setFullYear(enddate.getFullYear() + 1);
        const enddate = enddated;
        if (user) {
        
            await prisma.TempUser.update({
                where: { emailaddress },
                data: { paymentintentid ,startdate ,enddate , status }  
            });
            res.json({ status: 200, message: "Payment details updated successfully" });
        } else {
            res.json({ status: 400, message: "User not found" });
        }
    } catch (error) {
        res.json({ status: 500, message: "Internal server error: " + error.message });
    }
};








exports.transfertempusertousertable = async (req, res) => {
  try {
    console.log("transfer started");
    const { emailaddress } = req.body;
    console.log("emailaddress", emailaddress);

    // 1. Find temp user
    const tempUser = await prisma.TempUser.findUnique({
      where: { emailaddress },
    });

    if (!tempUser) {
      return res.json({ status: 400, message: "Temp user not found" });
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: tempUser.emailaddress },
    });

    if (existingUser) {
      return res.json({ status: 400, message: "User already exists in main table" });
    }

    // 3. Transaction: Create user + subscription + delete temp user
    const [newUser, newSubscription] = await prisma.$transaction(async (tx) => {
      const user = await tx.User.create({
        data: {
          firstname: tempUser.firstname,
          lastname: tempUser.lastname,
          email: tempUser.emailaddress,
          password: tempUser.password,
          address: tempUser.address,
          city: tempUser.city,
          state: tempUser.state,
          zipCode: tempUser.zipCode,
          roleId: 4, // default role
          startdate: tempUser.startdate,
          enddate: tempUser.enddate,
           status: "0",
          passwordresetlink: crypto.randomBytes(32).toString('hex'),
        },
      });

      const subscription = await tx.Subscriptions.create({
        data: {
          userId: user.id,
          StripeSubscriptionID: tempUser.paymentintentid || "pending",
          PlanName: "Pro Plan",
          PlanType: "Year",
          Amount: 300,
          Currency: "USD",
          StartDate: new Date(),
          EndDate: tempUser.enddate || null,
          RenewalPeriod: 1,
          Status: "active",
        },
      });

      // Delete the temp user after successful creation
      await tx.TempUser.delete({
        where: { emailaddress },
      });

      return [user, subscription];
    });

    // 4. Respond with success
    res.json({
      status: 200,
      message: "User and subscription created successfully. Temp user deleted.",
      data: { user: newUser, subscription: newSubscription },
    });
  } catch (error) {
    console.error("Error transferring user:", error);
    res.json({ status: 500, message: error.message });
  }
};



const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};


 


exports.proslogin = async (req, res) => {
  try {
    const { emailaddress, password } = req.body;
    console.log("email address & password", emailaddress, password);

    // 1. Find user
    const user = await prisma.user.findUnique({
      where: { 
          email: emailaddress,
          
         }, 
      include: { role: true },
    });

    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ status: 401, error: "Invalid email or password" });
    }
    if(user.status == "5"){
       return res.status(401).json({ status: 401, error: "The account has been blocked please contact admin" });
    }
    
   
    const subscription = await prisma.subscriptions.findFirst({
        where: { userId: user.id, Status: "active" },
        orderBy: { CreatedAt: 'desc' }  // latest subscription
    });


    if (!subscription) {
      return res.status(403).json({ status: 403, error: "No active subscription found" });
    }

    const now = new Date();
    if (now < subscription.startdate || now > subscription.enddate) {
      return res.status(403).json({ status: 403, error: "Subscription expired or not yet active" });
    }

    // 3. Generate token
    const token = generateToken({ id: user.id, role: user.role?.name || "user" });

    // 4. Send response
    res.json({
      status: 200,
      token,
      user: {
        id: user.id,
        email: user.email, // or emailaddress if that's your field
        role: user.role?.name,
        status : user.status
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ status: 500, message: error.message });
  }
};









