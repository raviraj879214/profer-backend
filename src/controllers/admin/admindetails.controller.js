const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 
const logActivity = require('../../lib/Logs/activityLogger');

exports.getuserdetailsbyid = async (req, res) => {
  try {
    const { id } = req.params;

    const userdetails = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        firstname: true,
        lastname: true,
        email: true,
        id: true
      }
    });

    if (userdetails) {
      res.json({
        status: 200,
        message: "User detail fetched successfully",
        data: userdetails
      });
    } else {
      res.json({
        status: 404,
        message: "User not found"
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error.message
    });
  }
};


exports.updateuserdetails = async (req, res) => {
  try {
     const userId = req.user?.id || 0;  
    const { id, firstname, lastname } = req.body;

    // Basic validation
    if (!id || !firstname || !lastname) {
      return res.status(400).json({ status: 400, message: "All fields are required" });
    }

    // Check if user exists first
    const existingUser = await prisma.user.findUnique({ where: { id : parseInt(id) } });
    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    // Update user
    const userupdate = await prisma.user.update({
      where: { id : parseInt(id) },
      data: { firstname, lastname }
    });

    await logActivity('Admin Updated profile', userId);

    res.status(200).json({ status: 200, message: "User updated successfully", data: userupdate });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ status: 500, message: error.message });
  }
};





exports.updateuserpassword = async (req, res) => {
  try {

    const userId = req.user?.id || 0;  

    const { id, currentpassword, newpassword } = req.body;

    // 1. Find user by ID
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    // 2. Compare current password with stored hashed password
    const isMatch = await bcrypt.compare(currentpassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: 400, message: "Current password is incorrect" });
    }

    // 3. Hash new password
    const hashedNewPassword = await bcrypt.hash(newpassword, 10);

    // 4. Update user password
    await prisma.user.update({
      where: { id: parseInt(id) },
      data: { password: hashedNewPassword }
    });
    await logActivity('Admin Updated Password', userId);
    return res.json({ status: 200, message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};





