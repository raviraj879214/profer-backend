const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 




exports.getcmpages = async (req, res) => {
    try {
        const cmsdetail = await prisma.Cms.findMany();

        return res.status(200).json({
            status: 200,
            message: "CMS fetched successfully",
            cms: cmsdetail   // will return [] if no records
        });
    } catch (error) {
        console.error("Error fetching CMS pages:", error);
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};



exports.updatecmspage = async (req, res) => {
    try {
        let { CmsID, CmsText } = req.body;
        console.log("update cms", CmsID, CmsText);

        // Ensure CmsID is a number
        const cmsId = parseInt(CmsID, 10);
        if (isNaN(cmsId)) {
            return res.status(400).json({ status: 400, message: "Invalid CMS ID" });
        }

        // Check if page exists
        const checkcms = await prisma.Cms.findUnique({
            where: { CmsID: cmsId }
        });

        if (!checkcms) {
            return res.status(404).json({ status: 404, message: "CMS page not found" });
        }

        // Update CMS page
        const cmsupdate = await prisma.Cms.update({
            where: { CmsID: cmsId },
            data: { CmsText: CmsText }
        });

        return res.status(200).json({
            status: 200,
            message: "CMS updated successfully",
            cms: cmsupdate
        });
    } catch (error) {
        console.error("Error updating CMS:", error);
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
