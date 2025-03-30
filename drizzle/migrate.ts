import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  const migrationClient = postgres(process.env.DATABASE_URL, { 
    max: 1,
    ssl: 'require'
  });

  try {
    const db = drizzle(migrationClient);
    await migrate(db, {
      migrationsFolder: path.resolve(__dirname, './migrations')
    });
    console.log('Migrations completed successfully');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await migrationClient.end();
  }
}

runMigrations();