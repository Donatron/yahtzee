const express = require("express");
const { check, validationResult } = require("express-validator");
const cors = require("cors");
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("./config/keys");

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
      await user
        .save()
        .then(user => res.json(user))
        .catch(err => console.error(err));
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check for user
  await User.findOne({ email })
    .then(user => {
      console.log("User");
      if (!user) {
        res.json({
          error: "Invalid email"
        });
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // Prepare payload for jsonwebtoken
          console.log("We have a match");
          const payload = {
            id: user.id,
            name: user.name
          };
          // sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) {
                res.json({
                  error: err
                });
              }
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          console.log("No match");
          res.status(400).json({
            error: "Password incorrect"
          });
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        errors: "Server error"
      });
    });

  // res.json({
  //   success: "Logged in"
  // });
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
