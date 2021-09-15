"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const sendDailyPrayerTime_1 = __importDefault(require("../services/sendDailyPrayerTime"));
//  # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *
const jobSendDailyPrayerTime = async () => {
    node_cron_1.default.schedule('0 0 * * monday', () => {
        console.log('========================cron Job started=================');
        (0, sendDailyPrayerTime_1.default)();
    });
};
exports.default = jobSendDailyPrayerTime;
//# sourceMappingURL=sendDailyPrayerTime.js.map