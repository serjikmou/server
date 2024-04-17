const express = require("express");
const { validate, Genre } = require("../models/genre");
const authToken = require("../middleware/auth");

const router = express.Router();

router.get("/", authToken, async (req, res) => {
  const result = await Genre.find();
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
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
  const { error } = validate(req.body);
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

module.exports = router;
