const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Joi = require("joi");
mongoose.set("useFindAndModify", false);
const Genre = new mongoose.model("Genre", {
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 5,
  },
});

router.get("/", async (req, res) => {
  const result = await Genre.find();
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const genre = await new Genre({
      name: req.body.name,
    });
    const result = await genre.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await Genre.findOneAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );
  if (!result)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const result = await Genre.findOneAndDelete(req.params.id);
  if (!result)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(result);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
