"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = exports.User = void 0;
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("./user"));
const time_1 = __importDefault(require("./time"));
const config_json_1 = __importDefault(require("../config/config.json"));
const env = process.env.NODE_ENV || 'development';
let sequelize;
if (config_json_1.default[env].use_env_variable) {
    sequelize = new sequelize_1.Sequelize(process.env[config_json_1.default[env].use_env_variable], config_json_1.default[env]);
}
else {
    sequelize = new sequelize_1.Sequelize(config_json_1.default[env].database, config_json_1.default[env].username, config_json_1.default[env].password, config_json_1.default[env]);
}
const db = {
    sequelize,
    Sequelize: sequelize_1.Sequelize,
    User: (0, user_1.default)(sequelize, sequelize_1.DataTypes),
    Time: (0, time_1.default)(sequelize, sequelize_1.DataTypes),
};
db.User.associate(db);
db.Time.associate(db);
const { User, Time } = db;
exports.User = User;
exports.Time = Time;
//# sourceMappingURL=index.js.map