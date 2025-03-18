import express from 'express';
import {
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/:userId', getUserById);
router.put('/', updateUser);
router.delete('/', deleteUser);

export default router;
