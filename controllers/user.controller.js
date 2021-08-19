const { validationResult } = require('express-validator');
const defaultResponse = require('../utils/defaultResponse');
const constants = require('../utils/constants');
const responseStatus = require('../utils/responseStatus');

const db = require('../models');

const User = db.user;

module.exports.create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      defaultResponse.error({ message: errors }, res, responseStatus.ERROR);
    }

    const UserDataExist = await User.findOne({
      where: { slack_id: req.body.slack_id },
    });
    if (UserDataExist) {
      res.send(constants.USER_EXIST);
    } else {
      const UserData = await User.create(req.body);
      if (UserData) {
        defaultResponse.success(
          constants.DATA_SAVED,
          UserData,
          res,
          responseStatus.SUCCESS
        );
      }
    }
  } catch (err) {
    defaultResponse.error({ message: err.message }, res, responseStatus.ERROR);
  }
};
