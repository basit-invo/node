"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var resultErrorObject = {
    error: false,
    message: '',
};
var resultSuccessObject = {};
exports.default = {
    error: function (error, res, status) {
        if (status === void 0) { status = 500; }
        resultErrorObject.error = true;
        resultErrorObject.message = error.message;
        resultErrorObject.data = null;
        res.status(status).json(resultErrorObject);
    },
    success: function (message, response, res, state, token, refreshToken, tokenExpiresIn) {
        if (token === void 0) { token = null; }
        if (refreshToken === void 0) { refreshToken = null; }
        if (tokenExpiresIn === void 0) { tokenExpiresIn = null; }
        resultSuccessObject.error = false;
        resultSuccessObject.message = message;
        var status = state;
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
