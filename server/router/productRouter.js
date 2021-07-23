const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/", productController.read);
router.get("/:id", productController.readById);
router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    productController.create
);
// router.put("/:id", verifyToken, productControlleManifest: Line: 1, column: 1, Syntax error.Manifest: Line: 1, column: 1, Syntax error.r.update);
// router.delete("/:id", verifyToken, productController.delete);

module.exports = router;
