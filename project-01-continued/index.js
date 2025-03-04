const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
app.use(express.urlencoded({ extended: false }));
app
  .route("/api/users")
  .get((req, res) => {
    return res.json(users);
  })
  .post((req, res) => {
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
app
  .route("/api/users/:id")
  .get((req, res) => {
    const userId = Number(req.params.id);
    const user = users.find((user) => user.id === userId);
    return res.json(user);
  })
  .patch((req, res) => {})
  .delete((req, res) => {});
app.get("/", (req, res) => {
  return res.send("this is home page");
});

app.get("/about", (req, res) => {
  return res.send(`This is about page, params = ${req.query.name}`);
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
