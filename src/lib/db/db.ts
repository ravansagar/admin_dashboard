import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import * as schema from './schema';
dotenv.config();

const getConnectionString = () => {
    const baseUrl = process.env.DATABASE_URL;

    if (!baseUrl) throw new Error('DATABASE_URL is not defined');
    return `${baseUrl}?sslmode=require&pgbouncer=true&connect_timeout=15`;
};
const client = postgres(getConnectionString(), {
    ssl: 'require',
    max: process.env.NODE_ENV === 'production' ? 10 : 3,
    idle_timeout: 20,
    prepare: false,
    transform: {
        undefined: null,
    },
});

export const db = drizzle(client, { schema });