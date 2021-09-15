import cron from 'node-cron';
import moment from 'moment';
import { Op } from 'sequelize';

import dailyPrayerTime from '../services/sendDailyPrayerTime';

import { Time } from '../models';

//  # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *

const prayerTimeIndividual = async () => {
  const dailytime = await Time.findOne({
    where: {
      city: 'Lahore',
      //createdAt: { [Op.gt]: moment().format('YYYY-MM-DD 00:00') },
    },
  });

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

  cron.schedule(`${fajrMinute} ${fajrHour} * * *`, () => {
    console.log('==================Fajr cron Job started=============');
    dailyPrayerTime('Fajr', fajr);
  });

  cron.schedule(`${dhuhrMinute} ${dhuhrHour} * * *`, () => {
    console.log('=================Dhuhr cron Job started=============');
    dailyPrayerTime('Dhuhr', dhuhr);
  });

  cron.schedule(`${asrMinute} ${asrHour} * * *`, () => {
    console.log('===================Asr cron Job started=============');
    dailyPrayerTime('Asr', asr);
  });

  cron.schedule(`${maghribMinute} ${maghribHour} * * *`, () => {
    console.log('==============Maghrib cron Job started==============');
    dailyPrayerTime('Maghrib', maghrib);
  });

  cron.schedule(`${ishaMinute} ${ishaHour} * * *`, () => {
    console.log('=================Isha cron Job started==============');
    dailyPrayerTime('Isha', isha);
  });
};
prayerTimeIndividual();
const jobSendDailyPrayerTime = async () => {
  cron.schedule('0 0 * * monday', () => {
    console.log('========================cron Job started=================');
    prayerTimeIndividual();
  });
};

export default jobSendDailyPrayerTime;
