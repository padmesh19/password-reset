const express = require("express");
const authRouter = require("./routes/authRoutes");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(bodyParser.json());

const corsOptions = {
  origin: "https://password-reset-padmesh.netlify.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/api/auth", authRouter);

module.exports = app;
