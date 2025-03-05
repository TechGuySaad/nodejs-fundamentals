const fs = require("fs");
function logFile(req, res, next) {
  fs.appendFile("logs.txt", `${req.method}${req.path} \n`, () => {
    console.log("Successfully written to log file");
  });
  next();
}
module.exports = logFile;
