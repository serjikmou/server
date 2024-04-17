const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const _ = require("lodash");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Not Found User");
    const salt = await bcrypt.compare(req.body.password, user.password);
    if (!salt) return res.status(400).send("INVALID PASSWORD");
    const token = user.generateToken();
    res.send(token);
  } catch (error) {
    console.log(error);
  }
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
