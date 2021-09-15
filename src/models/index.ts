// import { Sequelize, DataTypes } from 'sequelize';

// import * as config from '../config/config.json';
// const env = process.env.NODE_ENV || 'development';
// let sequelize: any;
// if (config[env].use_env_variable) {
//   sequelize = new Sequelize(
//     process.env[config[env].use_env_variable],
//     config[env]
//   );
// } else {
//   sequelize = new Sequelize(
//     config[env].database,
//     config[env].username,
//     config[env].password,
//     config[env]
//   );
// }

import { Sequelize } from 'sequelize';
import * as config from '../config/config.json';
import UserModel from './user';
import TimeModel from './time';
import { DataTypes } from 'sequelize';

let databaseUrl,
  creds = config['development'];
process.env.NODE_ENV === 'production'
  ? (databaseUrl = `${process.env.DATABASE_URL}?sslmode=require`)
  : (databaseUrl = `postgres://${creds.username}:${creds.password}@${creds.host}:${creds.port}/${creds.database}`);

const postgresConn = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ...(process.env.NODE_ENV === 'production' && {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }),
  },
});
postgresConn
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });

const db: any = {
  postgresConn,
  Sequelize,
  User: UserModel(postgresConn, DataTypes),
  Time: TimeModel(postgresConn, DataTypes),
};
db.User.associate(db);
db.Time.associate(db);

const { User, Time } = db;
export { User, Time };

export default postgresConn;
