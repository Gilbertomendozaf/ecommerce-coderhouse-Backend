const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statuscode = res.statusCode === 200 ? 500 : res.statusCode;

  // Only show stack traces when explicitly running in development.
  // Defaults to hiding internal details, so a missing NODE_ENV
  // never accidentally exposes file paths and internals to clients.
  if (process.env.NODE_ENV === 'development') {
    res.status(statuscode);
    res.json({
      status: 'fail',
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(statuscode);
    res.json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = { errorHandler, notFound };