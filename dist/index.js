"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var weeklyGetPrayerTime_1 = __importDefault(require("./jobs/weeklyGetPrayerTime"));
var sendDailyPrayerTime_1 = __importDefault(require("./jobs/sendDailyPrayerTime"));
var jobDailyPrayerTimeGroup_1 = __importDefault(require("./jobs/jobDailyPrayerTimeGroup"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type Cache-Control');
    res.header('Cache-Control', 'max-age=0');
    next();
});
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
(0, weeklyGetPrayerTime_1.default)();
(0, sendDailyPrayerTime_1.default)();
(0, jobDailyPrayerTimeGroup_1.default)();
app.get('/', function (req, res) {
    res.send('Hello World!!!');
});
app.use('/api', (0, routes_1.default)());
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
