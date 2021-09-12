'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
require('dotenv').config();
var express_1 = __importDefault(require('express'));
var cors = require('cors');
var router = require('../routes');
var jobWeeklyGetPrayerTime = require('../jobs/weeklyGetPrayerTime');
var jobDailyPrayerTime = require('../jobs/sendDailyPrayerTime');
var jobSendDailyPrayerTimeGroup = require('../jobs/jobDailyPrayerTimeGroup');
var app = (0, express_1.default)();
var port = 3000;
app.use(cors());
app.use(function (_req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, Content-Type Cache-Control'
  );
  res.header('Cache-Control', 'max-age=0');
  next();
});
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// jobWeeklyGetPrayerTime();
// jobDailyPrayerTime();
// jobSendDailyPrayerTimeGroup();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.use('/api', router());
app.listen(port, function () {
  console.log('Example app listening at http://localhost:' + port);
});
