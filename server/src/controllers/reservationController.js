import {
  getUserReservationsDb,
  getUserReservationByIdDb,
  createReservationDb,
  updateReservationDb,
  deleteReservationDb,
} from '../models/reservationModel.js';

import { calculateEndTime } from '../utils/reservationTime.js';

export const getUserReservations = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const reservations = await getUserReservationsDb(userId);

    if (reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found' });
    }

    return res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};

export const getUserReservationById = async (req, res) => {
  try {
    const { userId, reservationId } = req.params;

    if (!userId || !reservationId) {
      return res
        .status(400)
        .json({ message: 'User ID and Reservation ID are required' });
    }

    const reservation = await getUserReservationByIdDb(userId, reservationId);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    return res.status(200).json(reservation);
  } catch (error) {
    next(error);
  }
};

export const createReservation = async (req, res) => {
  try {
    const { userId } = req.params;
    const { table_id, number_of_visitors, start_time } = req.body;

    if (!userId || !table_id || !number_of_visitors || !start_time) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const end_time = calculateEndTime(start_time, number_of_visitors);

    const newReservation = await createReservationDb({
      userId,
      table_id,
      number_of_visitors,
      start_time,
      end_time,
    });

    return res.status(201).json(newReservation);
  } catch (error) {
    next(error);
  }
};

export const updateReservation = async (req, res) => {
  try {
    const { userId, reservationId } = req.params;
    const { table_id, number_of_visitors, start_time } = req.body;

    if (
      !reservationId ||
      !userId ||
      !table_id ||
      !number_of_visitors ||
      !start_time
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const end_time = calculateEndTime(start_time, number_of_visitors);

    const updatedReservation = await updateReservationDb({
      user_id: userId,
      reservation_id: reservationId,
      table_id,
      number_of_visitors,
      start_time,
      end_time,
    });

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    return res.status(200).json(updatedReservation);
  } catch (error) {
    next(error);
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const { userId, reservationId } = req.params;

    if (!userId || !reservationId) {
      return res
        .status(400)
        .json({ message: 'user ID and Reservation ID is required' });
    }

    await deleteReservationDb(userId, reservationId);

    return res
      .status(200)
      .json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    next(error);
  }
};
