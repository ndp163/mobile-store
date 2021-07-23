const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/image");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + uuidv4() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = multer({
    storage,
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
    fileFilter,
});
