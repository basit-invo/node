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
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
const moment = require('moment');
const { WebClient } = require('@slack/web-api');
const { Op } = Sequelize;
const db = require('../models');
const User = db.user;
const Time = db.time;
const dailyPrayerTime = () => __awaiter(void 0, void 0, void 0, function* () {
    const usersList = yield User.findAll({
        attributes: ['city', 'slack_id'],
    });
    const uList = yield usersList.map((user) => {
        const us = user.city.charAt(0).toUpperCase();
        const usr = us[0] + user.city.substring(1);
        return { city: usr, slack_id: user.slack_id };
    });
    // console.log(uList);
    uList.map((c) => __awaiter(void 0, void 0, void 0, function* () {
        const dailytime = yield Time.findOne({
            where: {
                city: c.city,
                createdAt: { [Op.gt]: moment().format('YYYY-MM-DD 00:00') },
            },
        });
        const web = new WebClient(process.env.SLACK_API_TOKEN);
        console.log('Fajr Time', dailytime.fajr);
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Use the `chat.postMessage` method to send a message from this app
                yield web.chat.postMessage({
                    channel: c.slack_id,
                    //   channel: '#test-prayer-bot',
                    text: `Today Namaz Time Fajr : ${dailytime.fajr}, Dhuhr : ${dailytime.dhuhr}, Asr : ${dailytime.asr}, Maghrib : ${dailytime.maghrib}, Isha : ${dailytime.isha},`,
                });
                console.log('Message posted!');
            }
            catch (error) {
                console.log('Slack Error', error);
            }
        }))();
    }));
});
exports.default = dailyPrayerTime;
//# sourceMappingURL=sendDailyPrayerTime.js.map