const express = require('express');
const { getTimes } = require('../controllers/times.controller');

const router = express.Router();

router.get('/times', getTimes);

module.exports = router;
