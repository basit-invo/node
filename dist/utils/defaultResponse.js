"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const resultErrorObject = {
    error: false,
    message: '',
};
const resultSuccessObject = {};
exports.default = {
    error: (error, res, status = 500) => {
        resultErrorObject.error = true;
        resultErrorObject.message = error.message;
        resultErrorObject.data = null;
        res.status(status).json(resultErrorObject);
    },
    success: (message, response, res, state, token = null, refreshToken = null, tokenExpiresIn = null) => {
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
        else {
            delete resultSuccessObject.token;
        }
        if (refreshToken != null) {
            resultSuccessObject.refreshToken = refreshToken;
        }
        else {
            delete resultSuccessObject.refreshToken;
        }
        if (tokenExpiresIn != null) {
            resultSuccessObject.tokenExpiresIn = tokenExpiresIn;
        }
        else {
            delete resultSuccessObject.tokenExpiresIn;
        }
        res.status(status).json(resultSuccessObject);
    },
};
//# sourceMappingURL=defaultResponse.js.map