const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();

// MIDDLE WARE / PLUGIN
app.use(express.urlencoded({ extended: false }));
// /api/users GET POST

app
  .route("/api/users")
  .get((req, res) => {
    // fs.writeFile("logs.txt", `${req.method + " " + req.path}`);
    fs.appendFile("logs.txt", `${req.method + " " + req.path}\n`, (err) => {
      if (err) {
        console.log("failure");
      } else {
        console.log("success");
      }
    });
    return res.json(users);
  })
  .post((req, res) => {
    fs.appendFile("logs.txt", `${req.method + " " + req.path}\n`, (err) => {
      if (err) {
        console.log("failure");
      } else {
        console.log("success");
      }
    });
    const id = users.length + 1;
    const newUser = { id: id, ...req.body };
    users.push(newUser);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.json({
          status: "Failed",
          user: `Failed to add ${newUser}`,
        });
      } else {
        return res.json({ status: "Success", user: newUser });
      }
    });
  });

// /api/users/:id GET PATCH DELETE
app
  .route("/api/users/:id")
  .get((req, res) => {
    fs.appendFile("logs.txt", `${req.method + " " + req.path}\n`, (err) => {
      if (err) {
        console.log("failure");
      } else {
        console.log("success");
      }
    });
    const userId = Number(req.params.id);
    const user = users.find((user) => user.id === userId);
    return res.json(user);
  })
  .patch((req, res) => {
    fs.appendFile("logs.txt", `${req.method + " " + req.path}\n`, (err) => {
      if (err) {
        console.log("failure");
      } else {
        console.log("success");
      }
    });
    const userId = Number(req.params.id);
    const user = users.find((user) => user.id === userId);

    const updateData = req.body;
    const updatedUser = { ...user, ...updateData };
    const newUsers = users.map((user) => {
      if (user.id === updatedUser.id) {
        return updatedUser;
      } else {
        return user;
      }
    });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(newUsers), (err) => {
      if (err) {
        return res.json({ status: err });
      } else {
        return res.json({ status: "success", user_updated: updatedUser });
      }
    });
  })
  .delete((req, res) => {
    fs.appendFile("logs.txt", `${req.method + " " + req.path}\n`, (err) => {
      if (err) {
        console.log("failure");
      } else {
        console.log("success");
      }
    });
    const userId = Number(req.params.id);

    const newUsers = users.filter((user) => user.id != userId);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(newUsers), (err) => {
      if (err) {
        return res.json({ status: "Delete unsuccessful" });
      } else {
        return res.json({ status: "Success", user_deleted_with_id: userId });
      }
    });
  });

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
