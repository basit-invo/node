/* eslint-disable @typescript-eslint/no-explicit-any */
const resultErrorObject: any = {
  error: false,
  message: '',
};

const resultSuccessObject: any = {};

export default {
  error: (error: any, res: any, status = 500) => {
    resultErrorObject.error = true;
    resultErrorObject.message = error.message;
    resultErrorObject.data = null;

    res.status(status).json(resultErrorObject);
  },

  success: (
    message: any,
    response: any,
    res: any,
    state: any,
    token = null,
    refreshToken = null,
    tokenExpiresIn = null
  ) => {
    resultSuccessObject.error = false;
    resultSuccessObject.message = message;
    let status = state;
    if (response == null) {
      status = 201;
    }
    resultSuccessObject.data = response;
    if (token != null) {
      resultSuccessObject.token = token;
    } else {
      delete resultSuccessObject.token;
    }
    if (refreshToken != null) {
      resultSuccessObject.refreshToken = refreshToken;
    } else {
      delete resultSuccessObject.refreshToken;
    }
    if (tokenExpiresIn != null) {
      resultSuccessObject.tokenExpiresIn = tokenExpiresIn;
    } else {
      delete resultSuccessObject.tokenExpiresIn;
    }
    res.status(status).json(resultSuccessObject);
  },
};
