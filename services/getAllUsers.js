const db = require('../models');

const User = db.user;

const getUsers = async () => {
  const usersList = await User.findAll({
    attributes: ['url'],
  });
  usersList.forEach((user) => {
    console.log(user.url);
  });
};

module.exports = getUsers;
