const { Sequelize } = require('sequelize');
const moment = require('moment');
const axios = require('axios');

const { Op } = Sequelize;

const db = require('../models');

const User = db.user;
const Time = db.time;

const dailyPrayerTime = async () => {
  const usersList = await User.findAll({
    attributes: ['city', 'url'],
  });
  const uList = await usersList.map((user) => {
    const us = user.city.charAt(0).toUpperCase();
    const usr = us[0] + user.city.substring(1);
    return { city: usr, url: user.url };
  });
  console.log(uList);
  uList.map(async (c) => {
    const dailytime = await Time.findOne({
      where: {
        city: c.city,
        createdAt: { [Op.gt]: moment().format('YYYY-MM-DD 00:00') },
      },
    });
    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', {
        fajr: dailytime.fajr,
      });
    } catch (error) {
      console.error(error);
    }

    // console.log(c.url);
    // console.log(dailytime.fajr);
  });
};

module.exports = dailyPrayerTime;
