const {
  tenRetriesInAboutThirtyMinutes,
} = require('@slack/web-api/dist/retry-policies');
const express = require('express');
const { create } = require('../controllers/user.controller');

const router = express.Router();

router.post('/user', create);

export default router;

// Reviews
// @params
// @returns
// throws erros
