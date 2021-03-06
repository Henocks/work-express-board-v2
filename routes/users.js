const express = require("express");
const router = express.Router();
const User = require("../models/User");
const util = require("../util");

router.get("/", util.isLoggedin, function (req, res) {
  User.find({})
    .sort({ username: 1 })
    .exec((err, users) => {
      if (err) return res.json(err);
      res.render("users/index", { users: users });
    });
});

router.get("/:username", util.isLoggedin, (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) return res.json(err);
    res.render("users/show", { user: user });
  });
});

module.exports = router;