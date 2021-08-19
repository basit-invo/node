require('dotenv').config();

const express = require('express');
const cron = require('node-cron');
const mailer = require('nodemailer');
const cors = require('cors');
const axios = require('axios');
const router = require('./routes');
const db = require('./models');

const User = db.user;
const Time = db.time;

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
  const timeInsert = async () => {
    const cityFiqaList = await User.findAll({
      attributes: ['city', 'fiqa'],
      group: ['city', 'fiqa'],
    });
    cityFiqaList.forEach((cl) => {
      const fetchTime = async () => {
        const cityTime = await axios.get(
          `https://api.pray.zone/v2/times/this_week.json?city=${cl.city}&fiqa=${cl.fiqa}`
        );
        console.log('city time', cityTime.data.results.location.city);
        const time = [];
        const City = cityTime.data.results.location.city;
        const Country = cityTime.data.results.location.country;
        const Juristic = cityTime.data.results.settings.juristic;
        const DateTime = cityTime.data.results.datetime;

        DateTime.forEach((dt) => {
          time.push({
            fajr: dt.times.Fajr,
            dhuhr: dt.times.Dhuhr,
            asr: dt.times.Asr,
            maghrib: dt.times.Maghrib,
            isha: dt.times.Isha,
            timeStamp: dt.date.timestamp,
            gregorian: dt.date.gregorian,
            city: City,
            country: Country,
            juristic: Juristic,
          });
        });

        Time.bulkCreate(time, {
          ignoreDuplicates: true,
        });
      };
      fetchTime();
    });
  };

  // cron.schedule('* * * * * 1', () => {
  //   timeInsert();
  // });

  res.send('Hello World!');
});

app.use('/api', router());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
