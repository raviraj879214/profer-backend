const multer = require('multer');
const path = require('path');
const fs = require('fs');

function createMulterUpload(folder) {
    const fullPath = path.join(__dirname, '..', folder);
    // Create folder if it doesn't exist
    if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, fullPath);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    return multer({ storage });
}

module.exports = createMulterUpload;
