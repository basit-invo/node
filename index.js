require('dotenv').config();

const express = require('express');
const mailer = require('nodemailer');
const cors = require('cors');
const router = require('./routes');
const jobWeeklyGetPrayerTime = require('./jobs/weeklyGetPrayerTime');
const dailyPrayerTime = require('./jobs/sendDailyPrayerTime');

const app = express();
const port = 3000;

// Creating a transporter
const transporter = mailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
function sendEmail(message) {
  // sending the email
  transporter
    .sendMail({
      from: '"Basit Ali" <bstjii25@gmail.com>',
      to: '"You there" <basit.ali@invozone.com>',
      subject: 'Scheduled Email',
      text: message,
    })
    .then(() => {
      console.log(`Email sent on ${new Date()}`);
    })
    .catch((error) => {
      console.log(error);
    });
}

// cron.schedule('* * * * * 1', () => {
//   sendEmail('This is testing');
// });

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

app.get('/', (req, res) => {
  dailyPrayerTime();
  jobWeeklyGetPrayerTime();
  res.send('Hello World!');
});

app.use('/api', router());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
