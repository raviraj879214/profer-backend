const multer = require('multer');
const path = require('path');
const fs = require('fs');

function createMulterUpload(folder) {
    const fullPath = path.join(__dirname, '..', folder);
    // Create folder if it doesn't exist
    if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, fullPath);
        },
        filename: (req, file, cb) => {
            const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
            cb(null, uniqueName);
        }
    });

    return multer({ storage });
}

module.exports = createMulterUpload;
