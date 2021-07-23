const pool = require("../database/db");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

module.exports = {
    async authorize(req, res) {
        try {
            const userSet = await pool.query(
                "SELECT username FROM account WHERE username=$1",
                [req.username]
            );
            if (userSet.rowCount)
                res.json({
                    success: true,
                });
            else
                res.status(400).json({
                    success: false,
                    message: "User not found",
                });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Interval server error",
            });
        }
    },
    async register(req, res) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({
                success: false,
                message: "Missing username or password!",
            });
        try {
            const userSet = await pool.query(
                "SELECT * FROM account WHERE username=$1",
                [username]
            );
            if (userSet.rowCount)
                return res.status(400).json({
                    success: false,
                    message: "Username already!",
                });
            const hashedPass = await argon2.hash(password);
            await pool.query(
                "INSERT INTO account(username, password, createdtime, modifiedtime) VALUES($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
                [username, hashedPass]
            );
            const token = jwt.sign(
                {
                    username,
                },
                process.env.SECRET_KEY
            );
            res.json({
                success: true,
                message: "User created successfully",
                token,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({
                success: false,
                message: "Missing username or/and password",
            });

        try {
            const userSet = await pool.query(
                "SELECT * FROM account WHERE username=$1",
                [username]
            );

            if (!userSet.rowCount)
                return res.status(400).json({
                    success: false,
                    message: "Incorrect username or password",
                });

            const passwordValid = await argon2.verify(
                userSet.rows[0].password,
                password
            );

            if (passwordValid) {
                const token = jwt.sign({ username }, process.env.SECRET_KEY);
                res.json({
                    success: true,
                    message: "User logged in successfully",
                    token,
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Incorrect username or password",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
};
