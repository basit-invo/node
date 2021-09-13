import { validationResult } from 'express-validator';
import defaultResponse from '../utils/defaultResponse';
import constants from '../utils/constants';
import responseStatus from '../utils/responseStatus';

import { User } from '../models';

// const User = db.user;

export const create = async (req: any, res: any) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      defaultResponse.error({ message: errors }, res, responseStatus.ERROR);
    }

    const UserDataExist = await User.findOne({
      where: { slack_id: req.body.slack_id },
    });
    if (!UserDataExist) {
      res.send(constants.USER_EXIST);
    }
    const UserData = await User.create(req.body);
    if (UserData) {
      defaultResponse.success(
        constants.DATA_SAVED,
        UserData,
        res,
        responseStatus.SUCCESS
      );
    }
  } catch (err) {
    defaultResponse.error({ message: err }, res, responseStatus.ERROR);
  }
};

// Review

// Dont need if else and brakets for single if, thorugh mulitple catch
// not null error through
