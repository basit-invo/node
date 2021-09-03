const cron = require('node-cron');

const dailyPrayerTime = require('../services/sendDailyPrayerTime');

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
  cron.schedule('0 0 * * monday', () => {
    console.log('========================cron Job started=================');
    dailyPrayerTime();
  });
};

module.exports = jobSendDailyPrayerTime;
