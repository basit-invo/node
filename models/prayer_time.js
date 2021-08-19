'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prayer_time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  prayer_time.init(
    {
      timings: DataTypes.STRING,
      city: DataTypes.STRING,
      fiqa: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'prayer_time',
    }
  );
  return prayer_time;
};
