const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("this is home page");
});

app.get("/about", (req, res) => {
  res.send(`This is about page, params = ${req.query.name}`);
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
