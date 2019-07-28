const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("./config/keys");
const auth = require("./middleware/auth");

// Load validation files
const validateLoginData = require("./validation/login");
const validateRegistrationData = require("./validation/register");
const validateProfileData = require("./validation/profile");

// Import mongoose models
const User = require("./models/User");
const Profile = require("./models/Profile");

const PORT = process.env.PORT || 9000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// connect to database
connectDB();

// Test route
app.get("/", (req, res) => {
  res.json({
    title: "We are go for nodemon"
  });
});

// @route POST register
// @desc Allows new users to register
// @access Public
app.post("/register", async (req, res) => {
  // Validate form input
  const { errors, isValid } = validateRegistrationData(req.body);

  // If validation errors exits, pass to server response
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ email: "Email already in use" });
    }

    // Create new user instance
    user = new User({
      name,
      email,
      password
    });
    // Generate salt for password encryption
    const salt = await bcrypt.genSalt(10);

    // Use salt to hash password
    user.password = await bcrypt.hash(password, salt);

    // Save user instance to database
    user
      .save()
      .then(user => {
        return res.json(user);
      })
      .catch(err => console.log(err));
  } catch (err) {
    res.send(err);
  }
});

// @route POST login
// @desc Login user and return JWT token
// @access Public
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
          email: "User not found"
        });
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // Prepare payload for jsonwebtoken
          const payload = {
            user: {
              id: user.id
            }
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
      res.status(500).json({
        errors: "Server error"
      });
    });
});

// @route GET user
// @desc Returns details of logged in user
// @access Private
app.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select([
      "-password",
      "-email",
      "-date"
    ]);

    if (!user) {
      return res.json({ user: "Not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "User error" });
  }
});

// @route GET profile
// @desc Allows user to view profile
// @access Private
app.get("/profile", auth, async (req, res) => {
  // Create error object to store any profile loading errors
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .populate("user", ["name"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "Profile not found for current user";
        res.status(404).json(errors);
      }

      return res.json(profile);
    })
    .catch(err => {
      res.status(404).json({ profile: "No profile for this user" });
    });
});

// @route POST profile
// @desc Allows users to create and update profile
// @access Private
app.post("/profile", auth, async (req, res) => {
  // Validate form input
  const { errors, isValid } = validateProfileData(req.body);

  // If validation errors exits, pass to server response
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { username, location, country } = req.body;
  const profileFields = { username, location, country };
  profileFields.user = req.user.id;
  profileFields.usernameLowerCase = profileFields.username.toLowerCase();

  // Check whether profile exists.
  try {
    let profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name"]
    );

    // Check if username already taken
    const profileUsername = await Profile.findOne({
      usernameLowerCase: profileFields.username.toLowerCase()
    });

    if (profileUsername && profileUsername.user.toString() !== req.user.id) {
      return res.status(401).json({ username: "Username already taken" });
    }

    // If username available, update Profile
    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: profileFields
        },
        { new: true }
      ).populate("user", ["name"]);
      return res.json(profile);
    }

    // If no profile, create new one and save
    profile = new Profile(profileFields);

    await profile.save();

    return res.json(profile);
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
