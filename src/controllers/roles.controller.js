import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();





export async function getRoles(req, res) {
  try {
    const allRoles = await prisma.permission.findMany({
                      include: {
                        role: true,
                        module: true
                      }
                    });
    return res.status(200).json({
      status: 200,
      message: 'Roles fetched successfully',
      data: allRoles,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Failed to fetch roles',
      error: error.message,
    });
  }
}


export async function rolesname(req,res) {
    try{
      const allRoles = await prisma.role.findMany({});
      return res.json({status: 200,message: 'Roles fetched successfully',data: allRoles,});
    }
    catch(ex){
      return res.json({status: 500,message: ex.message});
    }
}


export async function updatepermission(req, res) {
  try {
    const { ID, Field } = req.body;

    // Step 1: Fetch current permission value
    const existingPermission = await prisma.permission.findUnique({
      where: { id: parseInt(ID) },
      select: { [Field]: true } // Get only the field to be toggled
    });

    if (!existingPermission) {
      return res.json({ status: 404, message: "Permission not found." });
    }

    const currentValue = existingPermission[Field];

    // Step 2: Toggle the boolean value
    const updatedPermission = await prisma.permission.update({
      where: { id: parseInt(ID) },
      data: { [Field]: !currentValue },
    });

    return res.json({
      status: 200,
      message: "Permission toggled successfully",
      data: updatedPermission,
    });
  } catch (ex) {
    return res.json({ status: 500, message: ex.message });
  }
}

