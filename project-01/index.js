const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();

const PORT = 8000;

// Paths

// SSR
app.get("/users", (req, res) => {
  const html = `<ul>
    ${users
      .map((user) => {
        return `
            <li>${user.first_name}</li>
        `;
      })
      .join("")}
    </ul>
    
    `;
  return res.send(html);
});

// CSR
app
  .route("/api/users")
  .get((req, res) => {
    return res.json(users);
  })
  .post((req, res) => {
    // TODO: Add new user
    return res.json({ status: "Pending" });
  });

app
  .route("/api/users/:id")
  .get((req, res) => {
    const userId = Number(req.params.id);
    const user = users.find((user) => user.id === userId);
    return res.json(user);
  })
  .patch((req, res) => {
    // TODO: Update user with given id
  })
  .delete((req, res) => {
    // TODO: Delete user with given id
  });

app.listen(8000, () => {
  console.log(`Server is running on port ${PORT}`);
});
