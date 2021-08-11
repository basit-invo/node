require('dotenv').config();

const express = require('express');
const cron = require('node-cron');
const mailer = require('nodemailer');
const router = require('./routes');
const constants = require('./utils/constants');

const app = express();
const port = 3000;

console.log(constants.HANAFI);

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
  //sending the email
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

// cron.schedule('* * * * *', () => {
//   sendEmail('This is testing');
// });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', router());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
