const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 9000;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    title: "We are go for nodemon"
  });
});

app.post("/register", (req, res) => {
  res.json({
    success: "Registered new user"
  });
});

app.post("/login", (req, res) => {
  res.json({
    success: "Logged in"
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
