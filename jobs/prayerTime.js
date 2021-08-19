const axios = require('axios');
const cron = require('node-cron');
const db = require('../models');

const Time = db.time;
const User = db.user;

const prayerTime = async () => {
  const AllUsers = await User.findAll({});
  console.log(AllUsers);

  await Time.sequelize.truncate({ cascade: true });
  const response = await axios.get(
    'https://api.pray.zone/v2/times/this_week.json?city=lahore'
  );

  const time = [];
  const City = response.data.results.location.city;
  const Country = response.data.results.location.country;
  const Juristic = response.data.results.settings.juristic;
  const DateTime = response.data.results.datetime;

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
  console.log('running');
  // console.log(time);
  //   Time.bulkCreate(time, {
  //     ignoreDuplicates: true,
  //   });
};
// cron.schedule('* * * * *', () => {
//   prayerTime();
// });

module.exports = prayerTime;
