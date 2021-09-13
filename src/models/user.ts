'use strict';
import { Model } from 'sequelize';

export default (sequelize: any, DataTypes: any) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      fiqa: DataTypes.STRING,
      slack_id: DataTypes.STRING,
      channel: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  return user;
};
