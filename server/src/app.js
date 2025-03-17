import express from 'express';

import tablesRoutes from './routes/tablesRoutes.js';
import userRoutes from './routes/userRoutes.js';

import errorHandling from './middlewares/errorHandler.js';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/tables', tablesRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandling);

app.listen(port, () => {
  console.log(`🚀 Running on http://localhost:${port}`);
});
