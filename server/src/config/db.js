import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import pg from 'pg';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const { Pool } = pg;

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function runSqlFile(filePath) {
  const sql = fs.readFileSync(filePath, 'utf8');
  await pool.query(sql);
}

async function migrationTableExists() {
  const result = await pool.query(`
    SELECT to_regclass('public.migrations');
  `);
  return result.rows[0].to_regclass !== null;
}

async function createMigrationTable() {
  const createTableSql = `
    CREATE TABLE migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(createTableSql);
}

async function hasMigrationRun(migrationName) {
  const result = await pool.query('SELECT 1 FROM migrations WHERE name = $1', [
    migrationName,
  ]);
  return result.rowCount > 0;
}

async function recordMigration(migrationName) {
  await pool.query('INSERT INTO migrations (name) VALUES ($1)', [
    migrationName,
  ]);
}

async function runMigrations() {
  const migrationFolder = path.join(__dirname, '../migrations');
  const migrationFiles = fs.readdirSync(migrationFolder).sort();

  if (!(await migrationTableExists())) {
    await createMigrationTable();
    console.log('Created migrations table');
  }

  for (const file of migrationFiles) {
    const filePath = path.join(migrationFolder, file);

    if (await hasMigrationRun(file)) {
      //console.log(`Migration already applied: ${file}`);
      continue;
    }

    console.log(`Running migration: ${file}`);
    await runSqlFile(filePath);
    await recordMigration(file);
  }

  console.log('Migrations are up to date');
}

pool
  .connect()
  .then(() => {
    console.log('Connected to the database');
    return runMigrations();
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.stack);
  });

export default pool;
