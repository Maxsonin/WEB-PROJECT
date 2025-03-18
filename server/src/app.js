import express from 'express';

import tablesRoutes from './routes/tablesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import reservationRoutes from './routes/reservationsRoutes.js';

import cookieParser from 'cookie-parser';

import errorHandling from './middlewares/errorHandler.js';
import cookieJwtAuth from './middlewares/cookieJwtAuth.js';

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tables', cookieJwtAuth, tablesRoutes);
app.use('/api/users', cookieJwtAuth, userRoutes);
app.use('/api/reservations', cookieJwtAuth, reservationRoutes);

app.use(errorHandling);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
