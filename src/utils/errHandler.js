module.exports = (err, req, res, next) => {
  // console.error(err.stack);
  const responseObj = {};

  if (err.name === 'ValidationError') {
    res.statusCode = err.statusCode;
    responseObj.error = {
      type: err.type,
      name: err.name,
      message: err.message,
    };
  }

  return res.json(responseObj);
};