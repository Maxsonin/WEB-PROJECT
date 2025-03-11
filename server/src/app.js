import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pgp from 'pg-promise';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors);

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
