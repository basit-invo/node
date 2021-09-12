import express from 'express';

import user from './user';

const router = express.Router();

const routes = () => {
  router.use(user);
  return router;
};

export default routes;
