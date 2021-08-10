const express = require('express');
const times = require('./times');

const router = express.Router();

const routes = () => {
  router.use(times);
  return router;
};

module.exports = routes;
