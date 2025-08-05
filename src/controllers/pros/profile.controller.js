
const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 





exports.getproprofiledetails= async (req,res)=>{
    try {
        console.log("user fetched successfully");
        const {userid} = req.params;
        
        const userdetails = await prisma.User.findUnique({
            where : {id : parseInt(userid)},
            select : {
            id : true,
            firstname : true,
            lastname : true,
            email :true,
            address : true,
            city : true,
            state : true,
            zipCode : true
           }
        });

        if(userdetails){
            res.json({status : 200 , message : "User details fetched successfully",data : userdetails });
        }   
        else{
            res.json({status : 200 , message : "user not found" });
        }

    } catch (error) {
        res.json({status : 500, message : error.message });
    }
}




exports.updateprosprofile = async (req, res) => {
  try {
    const { id, firstname, lastname, email, address, city, state, zipCode } = req.body;

    if (!id) {
      return res.status(400).json({ status: 400, message: "User ID is required" });
    }

    const existingUser = await prisma.User.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const userupdate = await prisma.User.update({
      where: { id: parseInt(id) },
      data: { firstname, lastname, email, address, city, state, zipCode },
    });

    res.json({ status: 200, message: "Pros updated successfully", data: userupdate });

  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};






exports.getprosbusinesssocialmedia= async (req,res)=>{
    try {
        
        const {userid} = req.params;

        const getsociallinks =await prisma.ProBusinessDetails.findUnique({
            where : {userId : parseInt(userid)},
            select:{
                phone : true,
                website :true,
                maps :true,
                facebook :true
            }
        });

        if(getsociallinks){
            res.json({status : 200 , message : "social media links fetched" ,data : getsociallinks });
        }
        else{
            res.json({status : 200 , message : "not fetched successfully" });
        }

    } catch (error) {
           res.json({status : 500 , message : error.message }) ;
    }
}


exports.updatesocialmedialinks = async (req,res)=>{
    try {
        
        const {  phone ,website ,maps ,facebook , userid } = req.body; 


        const usersocialupdate = await prisma.ProBusinessDetails.update({
            where: {userId : parseInt(userid)},
            data :{
                phone : phone,
                website : website,
                maps : maps,
                facebook : facebook
            }
        });

        res.json({ status : 200 , message : "links updated successfully",data : usersocialupdate });
    } catch (error) {
        res.json({status : 500 , message : error.message});
    }
}