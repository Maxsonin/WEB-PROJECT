import pool from '../config/db.js';

export const getUserDb = async (user_id) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      user_id,
    ]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error retrieving user: ${error.message}`);
  }
};

export const createUserDb = async (name, phone_number) => {
  try {
    const result = await pool.query(
      'INSERT INTO users (name, phone_number) VALUES ($1, $2) RETURNING *',
      [name, phone_number]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const updateUserDb = async (user_id, name, phone_number) => {
  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, phone_number = $2 WHERE user_id = $3 RETURNING *',
      [name, phone_number, user_id]
    );

    if (result.rowCount === 0) {
      throw new Error('User not found');
    }

    return result.rows[0];
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

export const deleteUserDb = async (user_id) => {
  try {
    const result = await pool.query(
      'DELETE FROM users WHERE user_id = $1 RETURNING *',
      [user_id]
    );

    if (result.rowCount === 0) {
      throw new Error('User not found');
    }

    return result.rows[0];
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};
