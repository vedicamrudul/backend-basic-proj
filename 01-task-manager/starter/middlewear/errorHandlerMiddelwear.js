const {CustomApiError} = require('../errors/CustomApiError');
const errorHandlerMiddelwear = (err, req, res, next) => {
  // So express has a build in error Handler, which is used if we dont make a custom one. Here we are making a custom error handler which express knows since there are four parameters. Whenever this happens, express knows that the first one is error. And it knows this is the error handler we have made so whenever we pass an error object to the next() function- * next(err) *, it will pass it to this error handler automatically. 
  // Whenever we hit a route, we have wrapped the function in asyncWrapper. If there is an error in the function, it will be passed to the next function. The next function will pass it to the error handler.
  console.log(err)
  if (err instanceof CustomApiError) {
   
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(500).json({ msg: 'Something went wrong, please try again' })
};

module.exports = errorHandlerMiddelwear; 
