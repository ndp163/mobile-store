const pool = require("../database/db");
const fs = require("fs");

module.exports = {
    async create(req, res) {
        const {
            name,
            price,
            stock,
            description,
            manufacturer,
            category,
            condition,
        } = req.body;

        try {
            await pool.query(
                "INSERT INTO product VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $10, $11)",
                [
                    Math.random().toString().replace(".", "").slice(0, 13),
                    name,
                    parseInt(price),
                    parseInt(stock),
                    description,
                    manufacturer,
                    category,
                    condition === "New" ? 1 : condition === "Old" ? 2 : 3,
                    req.file.filename,
                    req.username,
                    req.username,
                ]
            );
            res.json({
                success: true,
                message: "LET'S GO",
            });
        } catch (error) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
    async read(req, res) {
        try {
            const productSet = await pool.query("SELECT * FROM Product");
            res.json({
                success: true,
                product: productSet.rows,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
    async readById(req, res) {
        try {
            const productSet = await pool.query(
                "SELECT * FROM Product WHERE id=$1",
                [req.params.id]
            );
            res.json({
                success: true,
                product: productSet.rows,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
};
