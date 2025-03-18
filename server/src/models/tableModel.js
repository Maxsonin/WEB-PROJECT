import pool from '../config/db.js';

export const getTablesDb = async () => {
  try {
    const result = await pool.query('SELECT * FROM tables');
    return result.rows;
  } catch (error) {
    throw new Error(
      `Error retrieving tables from the database: ${error.message}`
    );
  }
};
