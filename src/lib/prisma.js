const { PrismaClient } = require('@prisma/client'); 

const prisma = new PrismaClient(); 



/**
 * Middleware to check if a user has permission to perform an action on a module.
 *
 * @param {string} moduleName - e.g., "Orders", "Users", "Products"
 * @param {string} action - One of "Create", "Read", "Update", "Delete"
 */

const checkPermission = (moduleName, action) => {
  return async (req, res, next) => {
    try {
      console.log(`Checking permission for module: ${moduleName}, action: ${action}`);
      const user = req.user;

      // Check if user is authenticated
      if (!user || !user.id) {
        return res.json({ status : 401 , error: 'Unauthorized: User not authenticated' });
      }

      // Normalize action string: 'read' => 'canRead'
      const normalizedAction = action.charAt(0).toUpperCase() + action.slice(1).toLowerCase();
      const permissionField = `can${normalizedAction}`;

      // Fetch permission for the specific role and module, only if the specific permission field is true
      const permission = await prisma.permission.findFirst({
        where: {
          roleId: user.roleId,
          module: {
            name: moduleName,
          },
          [permissionField]: true, // dynamic filtering based on permission
        },
        include: {
          module: true,
        },
      });

      console.log("Fetched permission:", permission);

      if (!permission) {
        return res.json({
          status : 403,
          error: `Access Denied: You do not have ${normalizedAction} permission on ${moduleName}`,
        });
      }

      // ✅ Permission granted
      next();
    } catch (error) {
      console.log('Permission middleware error:', error);
      return res.json({status : 500, error: error.message || 'Internal Server Error' });
    }
  };
};

module.exports = { checkPermission };
