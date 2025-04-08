import express from 'express';

import {
  loginUser,
  createUser,
  checkUserAuth,
  logoutUser,
} from '../controllers/userController.js';
import cookieJwtAuth from '../middlewares/cookieJwtAuth.js';

const router = express.Router();

router.get('/check-auth', cookieJwtAuth, checkUserAuth);
router.post('/login', loginUser);
router.delete('/logout', cookieJwtAuth, logoutUser);
router.post('/', createUser);

export default router;
