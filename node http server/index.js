const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  //   console.log("Hello my server is created");
  fs.appendFile(
    "logs.txt",
    `Server received request at ${Date.now()} and at path ${req.url} \n`,
    (err, data) => {
      if (err) {
        console.log("Unable to write to file");
      } else {
        console.log("Successfully wrote to file");
      }
    }
  );

  switch (req.url) {
    case "/":
      res.end("Homepage");
      break;
    case "/about":
      res.end("about page");
      break;
    default:
      res.end("error 404 page not found");
  }
});

myServer.listen(8000, (err) => {
  if (err) {
    console.log("error starting server");
  } else {
    console.log("Server is running on port 8000");
  }
});
