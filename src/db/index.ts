import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString = process.env.DB_URL;

if (!connectionString) {
  throw new Error("DB_URL must be set to the Neon Postgres connection string.");
}

const sql = neon(connectionString);

export const db = drizzle(sql, { schema });
