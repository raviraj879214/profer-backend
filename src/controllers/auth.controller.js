const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const { PrismaClient } = require('@prisma/client'); 
const sendEmail = require('../lib/emailService');

const prisma = new PrismaClient(); 


const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};


exports.register = async (req, res) => {
  const { firstname, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstname,
        email,
        password: hashedPassword,
        roleId: parseInt(role),
        passwordresetlink: crypto.randomBytes(32).toString('hex'),

      },
    });

    res.status(201).json({ message: 'User registered successfully', user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed', details: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
   const user = await prisma.user.findUnique({ 
        where: { email },
        include: { role: true }
      });


    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.json({ status : 401, error: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.json({status : 200 , token, user: { id: user.id, email: user.email, role: user.role } });
  } 
  catch (error)
  {
    res.json({status : 500, error: 'Login failed' + error.message});
  }
};


exports.adminforgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
     
      
    const userEmail = await prisma.user.findUnique({
        where: { email },
      });

    
   
      console.log(userEmail);
      if (userEmail !== null) 
      {
            const resetLink = `${process.env.FRONTEND_PUBLIC_URL}/admin-reset-password/${userEmail.passwordresetlink}`; 


            const result = await sendEmail({
              to: email,
              subject: "Reset Your Password",
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 6px;">
                  <h2 style="color: #333;">Password Reset Request</h2>
                  <p>Hi <strong>${userEmail.name}</strong>,</p>
                  <p>You recently requested to reset your password for your account. Click the button below to reset it.</p>
                  <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px;">
                    Reset Password
                  </a>
                  <p>If you didn’t request a password reset, you can safely ignore this email.</p>
                  <p style="color: #999;">Thanks,<br/>The YourCompany Team</p>
                </div>`
            });

          if (result.success) {
            return res.json({ status: 200, message: "Email sent successfully to your email please go to email reset password" });
          } else {
            return res.json({ status : 500, message: "Failed to send email"});
          }
      } 
      else
      {
        
        return res.json({ status: 404, message: "Email not found" });
      }
  }
  catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};


exports.resetpasswordconfirmation = async (req,res)=>{
  try{
     const {passwordresetlink} = req.body;

      const usercheck = await prisma.user.findFirst({
          where: {
            passwordresetlink: passwordresetlink,
          },
        });
        if(usercheck != null){
          res.json({status : 200 , message : 'This is verified account', data : usercheck } );
        }
        else{
            res.json({status : 400 , message : 'verification token expired'});;
        }
  }
  catch(ex){
      res.json({status : 500 , message : ex.message});
  }
}

exports.resetpassword = async (req, res) => {
  try {
    const { password, passwordresetlink } = req.body;

    // Use findFirst if not unique
    const resetuser = await prisma.user.findFirst({
      where: { passwordresetlink },
    });

    if (!resetuser) {
      return res.json({ status: 400, message: "User not found or link invalid" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: resetuser.id },
      data: {
        password: hashedPassword,
        passwordresetlink: crypto.randomBytes(32).toString('hex'),
      },
    });

    return res.json({ status: 200, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ status: 500, message: error.message });
  }
};
