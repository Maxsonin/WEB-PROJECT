import express from 'express';

import { getAllTables } from '../controllers/tableController.js';

const router = express.Router();

router.get('/', getAllTables);

export default router;
