const axios = require('axios');
const cron = require('node-cron');
const db = require('../models');

const Time = db.time;

module.exports.getTimes = async (req, res) => {
  function getWeeklyPrayerTiming() {
    Time.sequelize.truncate({ cascade: true });
    axios
      .get('https://api.pray.zone/v2/times/this_week.json?city=lahore')
      .then((response) => {
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
        //   console.log(time);
        res.json('Times data fetched from API');
        Time.bulkCreate(time, {
          ignoreDuplicates: true,
        });
      })
      .catch((error) => console.log(error));
  }
  cron.schedule('* * * * 1', getWeeklyPrayerTiming());
};
