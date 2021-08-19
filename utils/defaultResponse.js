const resultErrorObject = {
  error: false,
  message: '',
};
const resultSuccessObject = {};
module.exports = {
  error: (error, res, status = 500) => {
    resultErrorObject.error = true;
    resultErrorObject.message = error.message;
    resultErrorObject.data = null;
    res.status(status).json(resultErrorObject);
  },
  success: (message, response, res, state, token = null) => {
    resultSuccessObject.error = false;
    resultSuccessObject.message = message;
    let status = state;
    if (response == null) {
      status = 201;
    }
    resultSuccessObject.data = response;
    if (token != null) {
      resultSuccessObject.token = token;
    }
    res.status(status).json(resultSuccessObject);
  },
};
