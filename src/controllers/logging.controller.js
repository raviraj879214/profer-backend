

const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 

exports.getlogging = async(req,res)=>{
    try {
        const userId = req.user?.id || 0;  
        console.log("Logging userid",userId);
        const logdet= await prisma.ActivityLog.findMany({
            where : {userId : userId }
        });
        res.json({status : 200, data : logdet });
    } catch (error) {
         res.json({status : 500 , message : error.message });
    }
}