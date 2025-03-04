const express = require("express");

app = express();

app.get("/", (req, res) => {
  res.send("This is home page");
});

app.listen(8000, (err) => {
  console.log("Server is running on port 8000");
});
