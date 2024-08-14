const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statuscode = res.statusCode === 200 ? 500 : res.statusCode;

  // Production environment: Send minimal error details
  if (process.env.NODE_ENV === 'production') {
    res.status(statuscode);
    res.json({
      status: 'fail',
      message: 'Something went wrong',
    });
  } else {
    // Development environment: Send detailed error information
    res.status(statuscode);
    res.json({
      status: 'fail',
      message: err.message,
      stack: err.stack,
    });
  }
};

module.exports = { errorHandler, notFound };
