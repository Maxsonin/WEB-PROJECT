import pool from '../config/db.js';

export const getUserReservationsDb = async (user_id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM reservations WHERE user_id = $1`,
      [user_id]
    );
    return result.rows;
  } catch (error) {
    throw new Error(`Error retrieving user reservations: ${error.message}`);
  }
};

export const getUserReservationByIdDb = async (user_id, reservation_id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM reservations WHERE user_id = $1 AND reservation_id = $2`,
      [user_id, reservation_id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(
      `Error retrieving user reservation by ID: ${error.message}`
    );
  }
};

export const createReservationDb = async ({
  user_id,
  table_id,
  number_of_visitors,
  start_time,
  end_time,
}) => {
  try {
    const result = await pool.query(
      `INSERT INTO reservations (user_id, table_id, number_of_visitors, start_time, end_time)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, table_id, number_of_visitors, start_time, end_time]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error creating reservation: ${error.message}`);
  }
};

export const updateReservationDb = async ({
  user_id,
  reservation_id,
  table_id,
  number_of_visitors,
  start_time,
  end_time,
}) => {
  try {
    const result = await pool.query(
      `UPDATE reservations
       SET table_id = $3, number_of_visitors = $4, start_time = $5, end_time = $6
       WHERE user_id = $1 AND reservation_id = $2
       RETURNING *`,
      [
        user_id,
        reservation_id,
        table_id,
        number_of_visitors,
        start_time,
        end_time,
      ]
    );

    if (result.rowCount === 0) {
      throw new Error('Reservation not found');
    }

    return result.rows[0];
  } catch (error) {
    throw new Error(`Error updating reservation: ${error.message}`);
  }
};

export const deleteReservationDb = async (user_id, reservation_id) => {
  try {
    const result = await pool.query(
      `DELETE FROM reservations
       WHERE user_id = $1 AND reservation_id = $2
       RETURNING *`,
      [user_id, reservation_id]
    );

    if (result.rowCount === 0) {
      throw new Error('Reservation not found');
    }

    return result.rows[0];
  } catch (error) {
    throw new Error(`Error deleting reservation: ${error.message}`);
  }
};
