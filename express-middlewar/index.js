const express = require("express");

const app = express();
// This is builtin middlewar
app.use(express.urlencoded({ extended: false }));

// This is custom middleware
app.use((req, res, next) => {
  console.log("This is my custom middleware");
  //   can do anything over here with the received request like logging etc or even alter the request
  next();
});

app.route("/").get((req, res) => {
  return res.json({ status: "great success" });
});

app.listen(8000, (err) => {
  console.log("Server is running");
});
