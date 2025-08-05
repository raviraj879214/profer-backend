const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 


exports.createCredentials = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    console.log("USER:", req.user);

    const userId = req.user?.id;
    if (!userId) {
      console.log("Unauthorized request");
      return res.status(401).json({ error: "Unauthorized user." });
    }

    const { section, names } = req.body;
    if (!section) {
      console.log("Missing section");
      return res.status(400).json({ error: "Section is required." });
    }
    if (!req.files || req.files.length === 0) {
      console.log("No files uploaded");
      return res.status(400).json({ error: "At least one document is required." });
    }

    let documentNames = [];
    try {
      documentNames = typeof names === "string" ? JSON.parse(names) : names;
    } catch (e) {
      console.log("Invalid names format");
      return res.status(400).json({ error: "Invalid names format. Send array or JSON." });
    }

    if (documentNames.length !== req.files.length) {
      console.log("Names count mismatch");
      return res.status(400).json({ error: "Names count must match uploaded files count." });
    }

    const credentialsData = req.files.map((file, idx) => ({
      userId,
      section,
      name: documentNames[idx] || "Untitled Document",
      fileUrl: `/uploads/credentials/${file.filename}`,
    }));

    await prisma.credential.createMany({ data: credentialsData });

    console.log("Upload success:", credentialsData);

    return res.status(201).json({
      message: "Credentials uploaded successfully",
      files: credentialsData
    });

  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Something went wrong while uploading." });
  }
};


// controllers/pros/credential.controller.js
exports.getCredentials = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { section } = req.query;
    if (!userId) return res.status(401).json({ error: "Unauthorized user" });

    const credentials = await prisma.credential.findMany({
      where: { userId, ...(section ? { section } : {}) },
      select: { id: true, name: true, fileUrl: true },
    });

    res.json({ credentials });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch credentials" });
  }
};



exports.deleteCredential = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid credential ID" });

    await prisma.credential.delete({
      where: { id }
    });

    res.json({ success: true, message: "Credential deleted successfully" });
  } catch (err) {
    console.error("Delete credential error:", err);
    res.status(500).json({ error: "Failed to delete credential" });
  }
};