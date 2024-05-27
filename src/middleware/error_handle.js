module.exports = errorHandler;

function errorHandler(err, req, res, next) {

  if (typeof err === "string") {
    return res.status(400).json({ message: err });
  }

  if (err.name === "PrismaClientKnownRequestError") {
    console.log('message',err.message);
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "NotFoundError") {
    // 404 not found
    return res
      .status(404)
      .json({ message: "Request " + req.url + " " + err.message });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}
