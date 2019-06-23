const express = require("express");
const { check, validationResult } = require("express-validator");
const cors = require("cors");
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");

// Import mongoose User model
const User = require("./models/User");

const PORT = process.env.PORT || 9000;

const app = express();

// connect to database
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    title: "We are go for nodemon"
  });
});

app.post(
  "/register",
  [
    check("username", "Please enter a valid username")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email address").isEmail(),
    check(
      "password",
      "Please enter a password of 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        error: errors.array()
      });
    }
    const { email, password, username, name } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({
          errors: [{ msg: "User already exists" }]
        });
      }

      // Create new user instance
      user = new User({
        email,
        password,
        username,
        name
      });

      // Prepare salt for password encryption
      const salt = await bcrypt.genSalt(10);

      // Update password to hash value
      user.password = await bcrypt.hash(password, salt);

      // Save user instance to db
      await user.save();

      // Encrypt password

      res.send("Register user route");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }

    // Return jsonwebtoken
  }
);

app.post("/login", (req, res) => {
  res.json({
    success: "Logged in"
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
