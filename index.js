require("dotenv").config();
const Joi = require("joi");
const genres = require("./routes/genres");
const express = require("express");
const error = require("./middleware/error");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`connecting to mongoDB ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index", { env: process.env.NODE_ENV });
});

app.use(express.json());
app.use(error);
app.use("/api/genres", genres);

connectDB().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}...`));
});
const port = process.env.PORT || 3000;
