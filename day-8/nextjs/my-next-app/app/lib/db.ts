import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const globalForPool = globalThis as unknown as { pool: Pool | undefined };

export const pool =
  globalForPool.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });