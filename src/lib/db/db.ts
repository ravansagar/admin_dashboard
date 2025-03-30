import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}?sslmode=require&pgbouncer=true`;

const client = postgres(connectionString, {
    ssl: "require",
    max: 10,
    prepare: false,
    idle_timeout: 20
});

export const db = drizzle(client);