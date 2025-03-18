import { getTablesDb } from '../models/tableModel.js';

export const getTables = async (req, res, next) => {
  try {
    const tables = await getTablesDb();
    res.status(200).json(tables);
  } catch (error) {
    next(err);
  }
};
