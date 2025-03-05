const express = require("express");
const mongoose = require("mongoose");

const fs = require("fs");

const app = express();
// Connect
mongoose
  .connect("mongodb://127.0.0.1:27017/master-nodejs")
  .then(() => {
    console.log("Successfully connected to mongodb");
  })
  .catch(() => {
    console.log("Error connecting to mongodb server");
  });

// Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
});
// Model
const User = mongoose.model("user", userSchema);

// MIDDLE WARE / PLUGIN
app.use(express.urlencoded({ extended: false }));
// /api/users GET POST

app
  .route("/api/users")
  .get(async (req, res) => {
    const users = await User.find({});
    return res.status(200).json(users);
  })
  .post(async (req, res) => {
    const body = req.body;
    const newUser = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      gender: body.gender,
      jobTitle: body.jobTitle,
    };
    const result = await User.create(newUser);
    return res.status(201).json({ status: "success", result });
  });

// /api/users/:id GET PATCH DELETE
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById({ _id: req.params.id });
    return res.status(200).json(user);
  })
  .patch(async (req, res) => {
    const body = req.body;
    console.log(body);
    console.log(req.params.id);
    const user = await User.findByIdAndUpdate(req.params.id, {
      ...body,
    });
    return res.status(200).json({ status: "success", user });
  })
  .delete(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
  });

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
