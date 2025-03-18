import { getAllTablesDb } from '../models/tableModel.js';

export const getAllTables = async (req, res, next) => {
  try {
    const tables = await getAllTablesDb();
    res.status(200).json(tables);
  } catch (error) {
    next(err);
  }
};
