function logger(err, req, res, next) {
  console.log(err);
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).send("خطای نامعتبر در داده");
  } else {
    next(err);
  }
}

module.exports = logger;
