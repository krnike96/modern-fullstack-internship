// import { Pool } from 'pg';

// export const pool = new Pool({
//   user: 'dbuser',
//   host: '://server.com',
//   database: 'mydb',
//   password: 'secretpassword',
//   port: 5432,
// });

import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Prevent multiple instances of Pool in development mode due to hot-reloading
const globalForPool = globalThis as unknown as { pool: Pool | undefined };

export const pool =
  globalForPool.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPool.pool = pool;
}