import { Router } from 'express';
import user from './user';

const router = Router();

const routes = () => {
  router.use(user);
  return router;
};

export default routes;
