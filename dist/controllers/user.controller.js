"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            defaultResponse_1.default.error({ message: errors }, res, responseStatus_1.default.ERROR);
        }
        const UserDataExist = yield models_1.User.findOne({
            where: { slack_id: req.body.slack_id },
        });
        if (!UserDataExist) {
            res.send(constants_1.default.USER_EXIST);
        }
        const UserData = yield models_1.User.create(req.body);
        if (UserData) {
            defaultResponse_1.default.success(constants_1.default.DATA_SAVED, UserData, res, responseStatus_1.default.SUCCESS);
        }
    }
    catch (err) {
        defaultResponse_1.default.error({ message: err }, res, responseStatus_1.default.ERROR);
    }
});
exports.create = create;
// Review
// Dont need if else and brakets for single if, thorugh mulitple catch
// not null error through
//# sourceMappingURL=user.controller.js.map