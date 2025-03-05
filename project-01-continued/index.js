const express = require("express");
const mongoose = require("mongoose");

const fs = require("fs");

const userRouter = require("./routes/users"); //api/users
const connectMongo = require("./connection");
const logFile = require("./middlewares");

const app = express();
connectMongo("mongodb://127.0.0.1:27017/master-nodejs")
  .then(() => {
    console.log("successfully connected mongo");
  })
  .catch(() => {
    console.log("error connecting to mongo db");
  });

// MIDDLE WARE / PLUGIN
app.use(express.urlencoded({ extended: false }));
// log file pluggin
app.use(logFile);
// router middleware
app.use("/api/users", userRouter);

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
