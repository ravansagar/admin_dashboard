import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '@/lib/db/db';
import postgres from 'postgres';
import path from 'path';

const runMigrations = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  console.log('Running migrations...');
  
  const migrationClient = postgres(process.env.DATABASE_URL, {
    max: 1,
    ssl: 'require'
  });

  try {
    await migrate(db, {
      migrationsFolder: path.join(__dirname, 'migrations')
    });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await migrationClient.end();
    process.exit(0);
  }
};

runMigrations();