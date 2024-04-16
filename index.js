const Joi = require("joi");
const genres = require("./routes/genres");
const express = require("express");
const error = require("./middleware/error");
const app = express();

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index", { env: process.env.NODE_ENV });
});

app.use(express.json());
app.use(error);
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
