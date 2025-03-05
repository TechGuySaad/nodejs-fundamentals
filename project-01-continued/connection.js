const mongoose = require("mongoose");

function connectMongo(url) {
  // mongodb://127.0.0.1:27017/master-nodejs
  return mongoose.connect(url);
}
module.exports = connectMongo;
