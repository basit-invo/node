const cron = require('node-cron');

const getPrayerTime = require('../services/getWeeklyPrayerTime');

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
  cron.schedule('0 0 * * monday', () => {
    console.log('========================cron Job started=================');
    getPrayerTime();
  });
};

module.exports = jobWeeklyGetPrayerTime;
