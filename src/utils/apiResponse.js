module.exports = {
  success: (data, statusCode = 200) => {
    return (req, res, next) => {
      res.status(statusCode).json({
        success: true,
        data,
      });
      next();
    };
  },

  error: (error, statusCode = 500) => {
    return (req, res, next) => {
      res.status(statusCode).json({
        success: false,
        data: {
          message: error.message,
          error,
        },
      });
      next();
    };
  },
};
