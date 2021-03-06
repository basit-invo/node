"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const router = (0, express_1.Router)();
const routes = () => {
    router.use(user_1.default);
    return router;
};
exports.default = routes;
//# sourceMappingURL=index.js.map