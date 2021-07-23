const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controller/authController");

const router = express.Router();

router.get("/", authMiddleware, authController.authorize);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
