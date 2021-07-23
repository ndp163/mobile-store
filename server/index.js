const PORT = process.env.PORT || 4000;

require("dotenv").config();
const express = require("express");
const authRouter = require("./router/authRouter");
const productRouter = require("./router/productRouter");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

app.listen(PORT, () => console.log("App is listening at port", PORT));
