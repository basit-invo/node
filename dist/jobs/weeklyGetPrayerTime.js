"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const getWeeklyPrayerTime_1 = __importDefault(require("../services/getWeeklyPrayerTime"));
//  # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *
const jobWeeklyGetPrayerTime = async () => {
    node_cron_1.default.schedule('0 0 * * monday', () => {
        console.log('========================cron Job started=================');
        (0, getWeeklyPrayerTime_1.default)();
    });
};
exports.default = jobWeeklyGetPrayerTime;
//# sourceMappingURL=weeklyGetPrayerTime.js.map