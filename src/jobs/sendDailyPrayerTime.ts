import cron from 'node-cron';

import dailyPrayerTime from '../services/sendDailyPrayerTime';

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

export default jobSendDailyPrayerTime;
