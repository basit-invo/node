import { Sequelize, DataTypes } from 'sequelize';
import UserModel from './user';
import TimeModel from './time';

import config from '../config/config.json';
const env = process.env.NODE_ENV || 'development';
let sequelize;
if (config[env].use_env_variable) {
  sequelize = new Sequelize(
    process.env[config[env].use_env_variable],
    config[env]
  );
} else {
  sequelize = new Sequelize(
    config[env].database,
    config[env].username,
    config[env].password,
    config[env]
  );
}
const db: any = {
  sequelize,
  Sequelize,
  User: UserModel(sequelize, DataTypes),
  Time: TimeModel(sequelize, DataTypes),
};
db.User.associate(db);
db.Time.associate(db);

const { User, Time } = db;
export { User, Time };
