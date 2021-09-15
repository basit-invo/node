"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const express_validator_1 = require("express-validator");
const defaultResponse_1 = __importDefault(require("../utils/defaultResponse"));
const constants_1 = __importDefault(require("../utils/constants"));
const responseStatus_1 = __importDefault(require("../utils/responseStatus"));
const models_1 = require("../models");
// const User = db.user;
const create = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            defaultResponse_1.default.error({ message: errors }, res, responseStatus_1.default.ERROR);
        }
        const UserDataExist = await models_1.User.findOne({
            where: { slack_id: req.body.slack_id },
        });
        if (!UserDataExist) {
            res.send(constants_1.default.USER_EXIST);
        }
        const UserData = await models_1.User.create(req.body);
        if (UserData) {
            defaultResponse_1.default.success(constants_1.default.DATA_SAVED, UserData, res, responseStatus_1.default.SUCCESS);
        }
    }
    catch (err) {
        defaultResponse_1.default.error({ message: err }, res, responseStatus_1.default.ERROR);
    }
};
exports.create = create;
// Review
// Dont need if else and brakets for single if, thorugh mulitple catch
// not null error through
//# sourceMappingURL=user.controller.js.map