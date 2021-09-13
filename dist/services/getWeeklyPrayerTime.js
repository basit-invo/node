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
var axios_1 = __importDefault(require("axios"));
var models_1 = __importDefault(require("../models"));
var User = models_1.default.user;
var Time = models_1.default.time;
var getPrayerTime = function () { return __awaiter(void 0, void 0, void 0, function () {
    var cityFiqaList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.findAll({
                    attributes: ['city', 'fiqa'],
                    group: ['city', 'fiqa'],
                })];
            case 1:
                cityFiqaList = _a.sent();
                return [4 /*yield*/, Promise.all(cityFiqaList.map(function (cl) { return __awaiter(void 0, void 0, void 0, function () {
                        var fetchTime;
                        return __generator(this, function (_a) {
                            fetchTime = function () { return __awaiter(void 0, void 0, void 0, function () {
                                var cityTime, time, City, Country, Juristic, DateTime;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, axios_1.default.get("https://api.pray.zone/v2/times/this_week.json?city=" + cl.city + "&fiqa=" + cl.fiqa)];
                                        case 1:
                                            cityTime = _a.sent();
                                            console.log('city time', cityTime.data.results.location.city);
                                            time = [];
                                            City = cityTime.data.results.location.city;
                                            Country = cityTime.data.results.location.country;
                                            Juristic = cityTime.data.results.settings.juristic;
                                            DateTime = cityTime.data.results.datetime;
                                            DateTime.forEach(function (dt) {
                                                time.push({
                                                    fajr: dt.times.Fajr,
                                                    dhuhr: dt.times.Dhuhr,
                                                    asr: dt.times.Asr,
                                                    maghrib: dt.times.Maghrib,
                                                    isha: dt.times.Isha,
                                                    timeStamp: dt.date.timestamp,
                                                    gregorian: dt.date.gregorian,
                                                    city: City,
                                                    country: Country,
                                                    juristic: Juristic,
                                                });
                                            });
                                            Time.bulkCreate(time, {
                                                ignoreDuplicates: true,
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            fetchTime();
                            return [2 /*return*/];
                        });
                    }); }))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.default = getPrayerTime;
// Reviews
// Loop in async behav promises.all()
