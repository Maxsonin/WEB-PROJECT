import { getAllTablesDb } from '../models/tableModel.js';

export const getAllTables = async (req, res) => {
  try {
    const tables = await getAllTablesDb();
    res.status(200).json(tables);
  } catch (error) {
    next(err);
  }
};
