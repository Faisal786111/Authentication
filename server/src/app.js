const express = require("express");
const userRouter = require("./routers/user");
require("./db/mysqlConnection");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

userRouter.use(cookieParser());
app.use("/users", userRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;