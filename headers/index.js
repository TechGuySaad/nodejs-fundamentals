const express = require("express");

const app = express();
// Middleware
app.use(express.urlencoded({ extended: false })); //this works on checking request header, and decodes formurl encoded

// app.use(express.json) we can do this if we are expecting json in request body

// Paths
app.route("/home").get((req, res) => {
  //   res.setHeader({ hi: "hi" });
  //   You can send custom headers in request
  console.log(req.headers);
  //   Use X-headername for custom headers
  res.set({ "X-username": "saad" });
  res.status(201).send({ status: "Success" });
});

// Starting server
app.listen(8000, (err) => {
  console.log("Server is listening on port 8000");
});
