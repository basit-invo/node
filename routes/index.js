const express = require('express');
const user = require('./user');

const router = express.Router();

const routes = () => {
  router.use(user);
  return router;
};

module.exports = routes;
