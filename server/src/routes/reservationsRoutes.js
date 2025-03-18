import express from 'express';
import {
  getUserReservations,
  getUserReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} from '../controllers/reservationController.js';

const router = express.Router();

router.get('/', getUserReservations);
router.get('/:reservationId', getUserReservationById);
router.post('/', createReservation);
router.put('/:reservationId', updateReservation);
router.delete('/:reservationId', deleteReservation);

export default router;
