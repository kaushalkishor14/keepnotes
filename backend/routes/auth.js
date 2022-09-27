const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// create  a user  uisng : POST "/api/auth/Createuser".Doesn't require Auth

router.post(
  "/Createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atlist 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //If there are errors , return Bad errror and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check weather the user with this eamil  exists  already
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res
        .status(400)
        .json({ email: "sorry a user with this eamil alreay exists" });
    }
    User = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    });
    // .then((user) => res.json(user))
    // .catch((err) => {
    //   console.log(err);
    //   res.json({
    //     error: "Please entre a unique value for email",
    //     message: err.message,
    //   });
    // });
    res.json({ Nice: "Nice" });
  }
);

module.exports = router;
