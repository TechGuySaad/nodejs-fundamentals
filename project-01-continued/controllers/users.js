const User = require("../models/users");

async function handleGetUsers(req, res) {
  const users = await User.find({});
  return res.status(200).json(users);
}

async function handleCreateUser(req, res) {
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
}

async function handleGetUserById(req, res) {
  const user = await User.findById({ _id: req.params.id });
  return res.status(200).json(user);
}

async function handleUpdateUserById(req, res) {
  const body = req.body;
  c;
  const user = await User.findByIdAndUpdate(req.params.id, {
    ...body,
  });
  return res.status(200).json({ status: "success", user });
}

async function handleDeleteUserById(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({ status: "successfully deleted" });
}

module.exports = {
  handleGetUsers,
  handleCreateUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
};
