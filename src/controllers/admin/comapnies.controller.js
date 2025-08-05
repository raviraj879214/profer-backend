
const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 




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