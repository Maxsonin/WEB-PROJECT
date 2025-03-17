import express from 'express';
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import userReservationRoutes from './reservationsRoutes.js';

const router = express.Router();

router.get('/:userId', getUser);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

router.use('/:userId/reservations', userReservationRoutes);

export default router;
