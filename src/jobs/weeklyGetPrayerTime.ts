import cron from 'node-cron';

import getPrayerTime from '../services/getWeeklyPrayerTime';

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

export default jobWeeklyGetPrayerTime;
