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
const node_cron_1 = __importDefault(require("node-cron"));
const getFajrPrayerTimeGroup_1 = __importDefault(require("../services/getFajrPrayerTimeGroup"));
// import db from '../models';
const models_1 = require("../models");
// const Time = db.time;
//  # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *
const prayerTimeGroup = () => __awaiter(void 0, void 0, void 0, function* () {
    const dailytime = yield models_1.Time.findOne({
        where: {
            city: 'Lahore',
            // createdAt: { [Op.gt]: moment().format('YYYY-MM-DD 00:00') },
        },
    });
    console.log(dailytime.fajr);
    const { fajr, dhuhr, asr, maghrib, isha } = dailytime;
    console.log(fajr, dhuhr, asr, maghrib, isha);
    const fajrSplit = fajr.split(':');
    const fajrHour = fajrSplit[0];
    const fajrMinute = fajrSplit[1];
    const dhuhrSplit = dhuhr.split(':');
    const dhuhrHour = dhuhrSplit[0];
    const dhuhrMinute = dhuhrSplit[1];
    const asrSplit = asr.split(':');
    const asrHour = asrSplit[0];
    const asrMinute = asrSplit[1];
    const maghribSplit = maghrib.split(':');
    const maghribHour = maghribSplit[0];
    const maghribMinute = maghribSplit[1];
    const ishaSplit = isha.split(':');
    const ishaHour = ishaSplit[0];
    const ishaMinute = ishaSplit[1];
    node_cron_1.default.schedule(`${fajrMinute} ${fajrHour} * * *`, () => {
        console.log('==================Fajr cron Job started=============');
        (0, getFajrPrayerTimeGroup_1.default)('Fajr', fajr);
    });
    node_cron_1.default.schedule(`${dhuhrMinute} ${dhuhrHour} * * *`, () => {
        console.log('=================Dhuhr cron Job started=============');
        (0, getFajrPrayerTimeGroup_1.default)('Dhuhr', dhuhr);
    });
    node_cron_1.default.schedule(`${asrMinute} ${asrHour} * * *`, () => {
        console.log('===================Asr cron Job started=============');
        (0, getFajrPrayerTimeGroup_1.default)('Asr', asr);
    });
    node_cron_1.default.schedule(`${maghribMinute} ${maghribHour} * * *`, () => {
        console.log('==============Maghrib cron Job started==============');
        (0, getFajrPrayerTimeGroup_1.default)('Maghrib', maghrib);
    });
    node_cron_1.default.schedule(`${ishaMinute} ${ishaHour} * * *`, () => {
        console.log('=================Isha cron Job started==============');
        (0, getFajrPrayerTimeGroup_1.default)('Isha', isha);
    });
});
prayerTimeGroup();
const jobSendDailyPrayerTimeGroup = () => __awaiter(void 0, void 0, void 0, function* () {
    node_cron_1.default.schedule('0 0 * * *', () => {
        console.log('============Daily Group cron Job started============');
        prayerTimeGroup();
    });
});
exports.default = jobSendDailyPrayerTimeGroup;
//# sourceMappingURL=jobDailyPrayerTimeGroup.js.map