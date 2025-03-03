const http = require("http");
const url = require("url");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    res.end();
  } else {
    const urlObj = url.parse(req.url, true);
    // console.log(urlObj);

    fs.appendFile(
      "logs.txt",
      `${Date.now() + " " + urlObj.pathname} \n`,
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully written to file");
        }
      }
    );
    switch (urlObj.pathname) {
      case "/":
        res.end("This is Homepage");
        break;
      case "/about":
        if (urlObj.query.name && urlObj.query.name) {
          res.end(
            `Hello ${urlObj.query.name} you are old with an age of ${urlObj.query.age}`
          );
        } else {
          res.end("Enter your name and age in the query string");
        }

        break;
      default:
        res.end("Error 404 not found");
    }
  }
});

myServer.listen(8000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is running on port 8000");
  }
});
