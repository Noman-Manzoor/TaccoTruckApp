module.exports = {
  success: (data, statusCode = 200) => {
    return (req, res, next) => {
      res.status(statusCode).json({
        success: true, data,
      });

    };
  },

  error: (error, statusCode = 500) => {
    console.log(error)
    return (req, res, next) => {
      res.status(statusCode).json({
        success: false, data: {
          message: error.message, error,
        },
      });
    };
  },
};
