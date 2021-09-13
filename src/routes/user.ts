import { Router } from 'express';
import { create } from '../controllers/user.controller';

const router = Router();

router.post('/user', create);

export default router;

// Reviews
// @params
// @returns
// throws erros
