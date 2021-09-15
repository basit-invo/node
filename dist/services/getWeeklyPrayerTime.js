"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const models_1 = require("../models");
// const User = db.user;
// const Time = db.time;
const getPrayerTime = async () => {
    const cityFiqaList = await models_1.User.findAll({
        attributes: ['city', 'fiqa'],
        group: ['city', 'fiqa'],
    });
    await Promise.all(cityFiqaList.map(async (cl) => {
        const fetchTime = async () => {
            const cityTime = await axios_1.default.get(`https://api.pray.zone/v2/times/this_week.json?city=${cl.city}&fiqa=${cl.fiqa}`);
            console.log('city time', cityTime.data.results.location.city);
            const time = [];
            const City = cityTime.data.results.location.city;
            const Country = cityTime.data.results.location.country;
            const Juristic = cityTime.data.results.settings.juristic;
            const DateTime = cityTime.data.results.datetime;
            DateTime.forEach((dt) => {
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
            models_1.Time.bulkCreate(time, {
                ignoreDuplicates: true,
            });
        };
        fetchTime();
    }));
};
exports.default = getPrayerTime;
// Reviews
// Loop in async behav promises.all()
//# sourceMappingURL=getWeeklyPrayerTime.js.map