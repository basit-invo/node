const { Sequelize } = require('sequelize');
const moment = require('moment');
const { WebClient } = require('@slack/web-api');

const { Op } = Sequelize;

const db = require('../models');

const Time = db.time;

const getPrayerTimeG = async () => {

    const dailytime = await Time.findOne({
      where: {
        city: 'Lahore',
        createdAt: { [Op.gt]: moment().format('YYYY-MM-DD 00:00') },
      },
    });

    const web = new WebClient(process.env.SLACK_API_TOKEN);
    console.log('Fajr Time', dailytime.fajr);

    (async () => {
      try {
        // Use the `chat.postMessage` method to send a message from this app
        await web.chat.postMessage({
          channel: '#test-prayer-bot',
          text: `Today Namaz Time Fajr : ${dailytime.fajr}, Dhuhr : ${dailytime.dhuhr}, Asr : ${dailytime.asr}, Maghrib : ${dailytime.maghrib}, Isha : ${dailytime.isha},`,
        });
        console.log('Message posted!');
      } catch (error) {
        console.log('Slack Error', error);
      }
    })();
  });
};

module.exports = getPrayerTimeG;
