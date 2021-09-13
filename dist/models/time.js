'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class time extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    time.init({
        fajr: DataTypes.STRING,
        dhuhr: DataTypes.STRING,
        asr: DataTypes.STRING,
        maghrib: DataTypes.STRING,
        isha: DataTypes.STRING,
        timestamp: DataTypes.STRING,
        gregorian: DataTypes.STRING,
        city: DataTypes.STRING,
        country: DataTypes.STRING,
        juristic: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'time',
    });
    return time;
};
