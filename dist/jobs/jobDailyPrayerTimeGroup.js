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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_cron_1 = __importDefault(require("node-cron"));
var moment_1 = __importDefault(require("moment"));
var getFajrPrayerTimeGroup_1 = __importDefault(require("../services/getFajrPrayerTimeGroup"));
var sequelize_1 = require("sequelize");
var models_1 = __importDefault(require("../models"));
var Time = models_1.default.time;
//  # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *
var prayerTimeGroup = function () { return __awaiter(void 0, void 0, void 0, function () {
    var dailytime, fajr, dhuhr, asr, maghrib, isha, fajrSplit, fajrHour, fajrMinute, dhuhrSplit, dhuhrHour, dhuhrMinute, asrSplit, asrHour, asrMinute, maghribSplit, maghribHour, maghribMinute, ishaSplit, ishaHour, ishaMinute;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Time.findOne({
                    where: {
                        city: 'Lahore',
                        createdAt: (_a = {}, _a[sequelize_1.Op.gt] = (0, moment_1.default)().format('YYYY-MM-DD 00:00'), _a),
                    },
                })];
            case 1:
                dailytime = _b.sent();
                fajr = dailytime.fajr, dhuhr = dailytime.dhuhr, asr = dailytime.asr, maghrib = dailytime.maghrib, isha = dailytime.isha;
                console.log(fajr, dhuhr, asr, maghrib, isha);
                fajrSplit = fajr.split(':');
                fajrHour = fajrSplit[0];
                fajrMinute = fajrSplit[1];
                dhuhrSplit = dhuhr.split(':');
                dhuhrHour = dhuhrSplit[0];
                dhuhrMinute = dhuhrSplit[1];
                asrSplit = asr.split(':');
                asrHour = asrSplit[0];
                asrMinute = asrSplit[1];
                maghribSplit = maghrib.split(':');
                maghribHour = maghribSplit[0];
                maghribMinute = maghribSplit[1];
                ishaSplit = isha.split(':');
                ishaHour = ishaSplit[0];
                ishaMinute = ishaSplit[1];
                node_cron_1.default.schedule(fajrMinute + " " + fajrHour + " * * *", function () {
                    console.log('==================Fajr cron Job started=============');
                    (0, getFajrPrayerTimeGroup_1.default)('Fajr', fajr);
                });
                node_cron_1.default.schedule(dhuhrMinute + " " + dhuhrHour + " * * *", function () {
                    console.log('=================Dhuhr cron Job started=============');
                    (0, getFajrPrayerTimeGroup_1.default)('Dhuhr', dhuhr);
                });
                node_cron_1.default.schedule(asrMinute + " " + asrHour + " * * *", function () {
                    console.log('===================Asr cron Job started=============');
                    (0, getFajrPrayerTimeGroup_1.default)('Asr', asr);
                });
                node_cron_1.default.schedule(maghribMinute + " " + maghribHour + " * * *", function () {
                    console.log('==============Maghrib cron Job started==============');
                    (0, getFajrPrayerTimeGroup_1.default)('Maghrib', maghrib);
                });
                node_cron_1.default.schedule(ishaMinute + " " + ishaHour + " * * *", function () {
                    console.log('=================Isha cron Job started==============');
                    (0, getFajrPrayerTimeGroup_1.default)('Isha', isha);
                });
                return [2 /*return*/];
        }
    });
}); };
prayerTimeGroup();
var jobSendDailyPrayerTimeGroup = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        node_cron_1.default.schedule('0 0 * * *', function () {
            console.log('============Daily Group cron Job started============');
            prayerTimeGroup();
        });
        return [2 /*return*/];
    });
}); };
exports.default = jobSendDailyPrayerTimeGroup;
