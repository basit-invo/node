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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require('sequelize').Sequelize;
var moment = require('moment');
var WebClient = require('@slack/web-api').WebClient;
var Op = Sequelize.Op;
var db = require('../models');
var User = db.user;
var Time = db.time;
var dailyPrayerTime = function () { return __awaiter(void 0, void 0, void 0, function () {
    var usersList, uList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.findAll({
                    attributes: ['city', 'slack_id'],
                })];
            case 1:
                usersList = _a.sent();
                return [4 /*yield*/, usersList.map(function (user) {
                        var us = user.city.charAt(0).toUpperCase();
                        var usr = us[0] + user.city.substring(1);
                        return { city: usr, slack_id: user.slack_id };
                    })];
            case 2:
                uList = _a.sent();
                // console.log(uList);
                uList.map(function (c) { return __awaiter(void 0, void 0, void 0, function () {
                    var dailytime, web;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, Time.findOne({
                                    where: {
                                        city: c.city,
                                        createdAt: (_a = {}, _a[Op.gt] = moment().format('YYYY-MM-DD 00:00'), _a),
                                    },
                                })];
                            case 1:
                                dailytime = _b.sent();
                                web = new WebClient(process.env.SLACK_API_TOKEN);
                                console.log('Fajr Time', dailytime.fajr);
                                (function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var error_1;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                _a.trys.push([0, 2, , 3]);
                                                // Use the `chat.postMessage` method to send a message from this app
                                                return [4 /*yield*/, web.chat.postMessage({
                                                        channel: c.slack_id,
                                                        //   channel: '#test-prayer-bot',
                                                        text: "Today Namaz Time Fajr : " + dailytime.fajr + ", Dhuhr : " + dailytime.dhuhr + ", Asr : " + dailytime.asr + ", Maghrib : " + dailytime.maghrib + ", Isha : " + dailytime.isha + ",",
                                                    })];
                                            case 1:
                                                // Use the `chat.postMessage` method to send a message from this app
                                                _a.sent();
                                                console.log('Message posted!');
                                                return [3 /*break*/, 3];
                                            case 2:
                                                error_1 = _a.sent();
                                                console.log('Slack Error', error_1);
                                                return [3 /*break*/, 3];
                                            case 3: return [2 /*return*/];
                                        }
                                    });
                                }); })();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
exports.default = dailyPrayerTime;
