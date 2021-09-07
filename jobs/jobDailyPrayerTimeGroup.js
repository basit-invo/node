const { Sequelize } = require('sequelize');
const cron = require('node-cron');
const moment = require('moment');

const fajrPrayerTimeGroup = require('../services/getFajrPrayerTimeGroup');

const { Op } = Sequelize;

const db = require('../models');

const Time = db.time;

//  # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *

const prayerTimeGroup = async () => {
  const dailytime = await Time.findOne({
    where: {
      city: 'Lahore',
      //   createdAt: { [Op.gt]: moment().format('YYYY-MM-DD 00:00') },
    },
  });

  // eslint-disable-next-line object-curly-newline
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
    fajrPrayerTimeGroup('Fajr', fajr);
  });

  cron.schedule(`${dhuhrMinute} ${dhuhrHour} * * *`, () => {
    console.log('=================Dhuhr cron Job started=============');
    fajrPrayerTimeGroup('Dhuhr', dhuhr);
  });

  cron.schedule(`${asrMinute} ${asrHour} * * *`, () => {
    console.log('===================Asr cron Job started=============');
    fajrPrayerTimeGroup('Asr', asr);
  });

  cron.schedule(`${maghribMinute} ${maghribHour} * * *`, () => {
    console.log('==============Maghrib cron Job started==============');
    fajrPrayerTimeGroup('Maghrib', maghrib);
  });

  cron.schedule(`${ishaMinute} ${ishaHour} * * *`, () => {
    console.log('=================Isha cron Job started==============');
    fajrPrayerTimeGroup('Isha', isha);
  });
};

prayerTimeGroup();

const jobSendDailyPrayerTimeGroup = async () => {
  cron.schedule('0 0 * * *', () => {
    console.log('============Daily Group cron Job started============');
    prayerTimeGroup();
  });
};

module.exports = jobSendDailyPrayerTimeGroup;
