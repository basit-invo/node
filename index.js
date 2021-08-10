const express = require('express');
const router = require('./routes');
const constants = require('./utils/constants');

const app = express();
const port = 3000;

console.log(constants.HANAFI);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', router());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
