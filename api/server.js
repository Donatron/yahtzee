const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("./config/keys");

// Load validation files
const validateLoginData = require("./validation/login");
const validateRegistrationData = require("./validation/register");

// Import mongoose User model
const User = require("./models/User");

const PORT = process.env.PORT || 9000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// connect to database
connectDB();

app.get("/", (req, res) => {
  res.json({
    title: "We are go for nodemon"
  });
});

app.post("/test", (req, res) => {
  res.json(req.body);
});

app.post("/register", async (req, res) => {
  // Validate form input
  const { errors, isValid } = validateRegistrationData(req.body);

  // If validation errors exits, pass to server response
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { name, email, password, username } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ email: "Email already in use" });
    }

    // Create new user instance
    user = new User({
      name,
      email,
      password,
      username
    });

    // Generate salt for password encryption
    const salt = await bcrypt.genSalt(10);

    // Use salt to hash password
    user.password = await bcrypt.hash(password, salt);

    // Save user instance to database
    user
      .save()
      .then(user => {
        res.json(user);
      })
      .catch(err => console.log(err));
  } catch (err) {
    res.send(err);
  }
});

app.post("/login", async (req, res) => {
  // Run input validation
  const { errors, isValid } = validateLoginData(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  // Check for user
  await User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).json({
          email: "Invalid email"
        });
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // Prepare payload for jsonwebtoken
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
          return res.status(400).json({
            password: "Password incorrect, please try again"
          });
        }
      });
    })
    .catch(err => {
      console.log("Catch running");
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
