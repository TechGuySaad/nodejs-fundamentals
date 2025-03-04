const http = require("http");
const url = require("url");
const fs = require("fs");
http
  .createServer((req, res) => {
    console.log("Server has received request");
    const method = req.method;

    const urlObj = url.parse(req.url, true);
    if (urlObj.pathname === "/favicon.ico") {
      res.end();
    } else {
      fs.appendFile(
        "logs.txt",
        `${method + " " + urlObj.pathname} \n`,
        (err) => {
          if (err) {
            console.log("error logging file");
          } else {
            console.log("successfully logged");
          }
        }
      );
      switch (urlObj.pathname) {
        case "/":
          if (method === "GET") res.end("this is home");

          break;
        case "/about":
          if (method === "GET") res.end("this is about page");

          break;

        case "/signup":
          if (method === "GET") {
            res.end("this is a signup form");
          } else if (method === "POST") {
            // DB query
            res.end("DB was updated and signup was done");
          }
          break;

        default:
          res.end("error 404 page not found");
          break;
      }
    }
    // console.log(urlObj);
  })
  .listen(8000, (err) => {
    console.log("Server is running on port 8000");
  });
