const fs = require("fs");

// Synchronous, Blocking operations
// fs.writeFileSync("test.txt", "Hello I am Saad");

// const testData = fs.readFileSync("test.txt", "utf-8");

// console.log(testData);

// Asynchronous, Non Blocking Operations

// fs.writeFile(
//   "test.txt",
//   "Hello I am writing in a file using non blocking function",
//   (err) => {
//     if (err) {
//       console.log("Error writing in file");
//     } else {
//       console.log("Successfully written in file");
//     }
//   }
// );

fs.readFile("test.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("Error reading file");
  } else {
    console.log("Read the file using a non-blocking operation:", data);
  }
});

fs.appendFile("test.txt", "\n I am appending this line", (err) => {
  if (err) {
    console.log("Error appending to file");
  } else {
    console.log("successfully appended to file");
  }
});

fs.stat("test.txt", (err, stat) => {
  if (err) {
    console.log("Error getting status");
  } else {
    console.log(stat);
  }
});
