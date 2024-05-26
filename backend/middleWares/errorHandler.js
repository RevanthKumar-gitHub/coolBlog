const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;

  switch (statusCode) {
    case 400:
      res.json({
        success: false,
        title: "VALIDATION ERROR",
        message: err.message,
      });
      break;
    case 401:
      res.json({
        success: false,
        title: "AUTHORIZATION ERROR",
        message: err.message,
      });
      break;
    case 403:
      res.json({
        success: false,
        title: "FORBIDDEN_ERR",
        message: err.message,
      });
      break;
    case 404:
      res.json({
        success: false,
        title: "NOT FOUND",
        message: err.message,
      });
      break;
    case 500:
      res.json({
        success: false,
        title: "INTERNAL SERVER ERROR",
        message: err.message,
      });
      break;
    default:
      res.status(500).json({
        success: false,
        title: "UNDEFIEND ERROR",
        message: "UNKNOWN SERVER ERROR",
        stack: err.stack,
      });
  }
};

const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    title: "PAGE NOT FOUND",
    message: "PAGE_URL is undefiend",
  });
};

module.exports = { errorHandler, notFound };
