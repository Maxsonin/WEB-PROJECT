import express from 'express';
import pool from './config/db.js';

const app = express();

const port = process.env.PORT || 3000;

app.get('/tables', async (req, res) => {
  const response = await pool.query('SELECT * FROM tables');
  res.send(response.rows);
});

app.listen(port, () => {
  console.log(`ERunning on http://localhost:${port}`);
});
