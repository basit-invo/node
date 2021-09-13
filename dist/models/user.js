'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class user extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    user.init({
        name: DataTypes.STRING,
        city: DataTypes.STRING,
        fiqa: DataTypes.STRING,
        slack_id: DataTypes.STRING,
        channel: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'user',
    });
    return user;
};
//# sourceMappingURL=user.js.map