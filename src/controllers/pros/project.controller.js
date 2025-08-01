const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 



exports.getprojectdetailsbyprosid = async (req,res)=>{
    try {
     const { id } = req.params;
     console.log("user id",id);
     const projectdetails = await prisma.project.findMany({
                where: {
                    status: 0,
                     prosId: {
                        contains: id.toString() // since prosId is stored like "5,6"
                    }
                },
                select: {
                    id: true,
                    projectTitle: true,
                    propertyType: true,
                    enddate: true,
                    budget: true,
                    prosId: true,
                    bids: true // include all fields of bids
                },
                orderBy: {
                    enddate: 'desc'
                }
                });

        if(projectdetails){
            res.json({status : 200 ,message : "project details fetched successfully" , data : projectdetails });
        }
        else{
            res.json({status : 200 ,message : "project not fetched successfully"});
        }
    } catch (error) {
        res.json({ status : 500 , message : error.message});
    }
}





exports.makebidbypro = async (req, res) => {
  try {
    const { amount, message, projectId, proId } = req.body;

    const createbid = await prisma.Bid.create({
      data: {
        amount: parseInt(amount),   // Ensure integer
        message: message || null,   // Optional field
        status: 0,
        projectId: projectId,
        proId : parseInt(proId)
      },
    });

    res.json({ status: 200, message: "Bid created successfully", data: createbid });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};
