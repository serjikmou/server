const express = require("express");
const { validate, User } = require("../models/user");
const _ = require("lodash");
const router = express.Router();
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const result = await User.find();
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("already User Registered");
    user = await new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result = await user.save();
    const token = user.generateToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await User.findOneAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );
  if (!result)
    return res.status(404).send("The User with the given ID was not found.");

  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const result = await User.findOneAndDelete(req.params.id);
  if (!result)
    return res.status(404).send("The User with the given ID was not found.");

  res.send(result);
});

module.exports = router;
