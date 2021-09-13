"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const weeklyGetPrayerTime_1 = __importDefault(require("./jobs/weeklyGetPrayerTime"));
const sendDailyPrayerTime_1 = __importDefault(require("./jobs/sendDailyPrayerTime"));
const jobDailyPrayerTimeGroup_1 = __importDefault(require("./jobs/jobDailyPrayerTimeGroup"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use((_req, res, next) => {
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
app.get('/', (req, res) => {
    res.send('Hello World!!!');
});
app.use('/api', (0, routes_1.default)());
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
