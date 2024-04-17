const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Joi = require("joi");

const Genre = new mongoose.model("Genre", {
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 5,
  },
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
