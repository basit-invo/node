"use strict";
// import { Sequelize, DataTypes } from 'sequelize';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = exports.User = void 0;
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
const sequelize_1 = require("sequelize");
const config = __importStar(require("../config/config.json"));
const user_1 = __importDefault(require("./user"));
const time_1 = __importDefault(require("./time"));
const sequelize_2 = require("sequelize");
let databaseUrl, creds = config['development'];
process.env.NODE_ENV === 'production'
    ? (databaseUrl = `${process.env.DATABASE_URL}?sslmode=require`)
    : (databaseUrl = `postgres://${creds.username}:${creds.password}@${creds.host}:${creds.port}/${creds.database}`);
const postgresConn = new sequelize_1.Sequelize(databaseUrl, {
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
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
const db = {
    postgresConn,
    Sequelize: sequelize_1.Sequelize,
    User: (0, user_1.default)(postgresConn, sequelize_2.DataTypes),
    Time: (0, time_1.default)(postgresConn, sequelize_2.DataTypes),
};
db.User.associate(db);
db.Time.associate(db);
const { User, Time } = db;
exports.User = User;
exports.Time = Time;
exports.default = postgresConn;
//# sourceMappingURL=index.js.map