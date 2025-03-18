import express from 'express';

import { loginUser, createUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/login', loginUser);
router.post('/', createUser);

export default router;
