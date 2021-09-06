require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./routes');
const jobWeeklyGetPrayerTime = require('./jobs/weeklyGetPrayerTime');
const jobDailyPrayerTime = require('./jobs/sendDailyPrayerTime');
const jobSendDailyPrayerTimeGroup = require('./jobs/jobDailyPrayerTimeGroup');

const app = express();
const port = 3000;

app.use(cors());
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, Content-Type Cache-Control'
  );
  res.header('Cache-Control', 'max-age=0');
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

jobWeeklyGetPrayerTime();
jobDailyPrayerTime();
jobSendDailyPrayerTimeGroup();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', router());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
