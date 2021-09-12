const { Sequelize } = require('sequelize');
const moment = require('moment');
const { WebClient } = require('@slack/web-api');

const { Op } = Sequelize;

const db = require('../models');

const User = db.user;
const Time = db.time;

const dailyPrayerTime = async () => {
  const usersList = await User.findAll({
    attributes: ['city', 'slack_id'],
  });
  const uList = await usersList.map(
    (user: { city: string; slack_id: string }) => {
      const us = user.city.charAt(0).toUpperCase();
      const usr = us[0] + user.city.substring(1);
      return { city: usr, slack_id: user.slack_id };
    }
  );
  // console.log(uList);
  uList.map(async (c: { city: string; slack_id: string }) => {
    const dailytime = await Time.findOne({
      where: {
        city: c.city,
        createdAt: { [Op.gt]: moment().format('YYYY-MM-DD 00:00') },
      },
    });

    const web = new WebClient(process.env.SLACK_API_TOKEN);
    console.log('Fajr Time', dailytime.fajr);

    (async () => {
      try {
        // Use the `chat.postMessage` method to send a message from this app
        await web.chat.postMessage({
          channel: c.slack_id,
          //   channel: '#test-prayer-bot',
          text: `Today Namaz Time Fajr : ${dailytime.fajr}, Dhuhr : ${dailytime.dhuhr}, Asr : ${dailytime.asr}, Maghrib : ${dailytime.maghrib}, Isha : ${dailytime.isha},`,
        });
        console.log('Message posted!');
      } catch (error) {
        console.log('Slack Error', error);
      }
    })();
  });
};

export default dailyPrayerTime;
