require('dotenv').config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './routes';
import jobWeeklyGetPrayerTime from './jobs/weeklyGetPrayerTime';
import jobDailyPrayerTime from './jobs/sendDailyPrayerTime';
import jobSendDailyPrayerTimeGroup from './jobs/jobDailyPrayerTimeGroup';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use((_req: Request, res: Response, next: NextFunction) => {
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

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!!!');
});

app.use('/api', router());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
