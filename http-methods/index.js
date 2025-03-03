const http = require("http");

http
  .createServer((req, res) => {
    console.log("Server has received request");
    res.end("Server says hi");
  })
  .listen(8000, (err) => {
    console.log("Server is running on port 8000");
  });
