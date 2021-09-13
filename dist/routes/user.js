"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var router = (0, express_1.Router)();
router.post('/user', user_controller_1.create);
exports.default = router;
// Reviews
// @params
// @returns
// throws erros
