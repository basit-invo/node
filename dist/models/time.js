'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    var time = /** @class */ (function (_super) {
        __extends(time, _super);
        function time() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        time.associate = function (models) {
            // define association here
        };
        return time;
    }(sequelize_1.Model));
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
        sequelize: sequelize,
        modelName: 'time',
    });
    return time;
};
