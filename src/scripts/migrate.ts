import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '@/lib/db/db';
import postgres from 'postgres';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const runMigrations = async () => {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }
  
    console.log('⏳ Running migrations...');
  
    // Create a dedicated migration client
    const migrationClient = postgres(process.env.DATABASE_URL, {
      max: 1,
      ssl: 'require',
    });
  
    try {
      await migrate(db, {
        migrationsFolder: path.resolve(__dirname, '../drizzle/migrations'),
      });
      console.log('Migrations completed successfully');
    } catch (err) {
      console.error('Migration failed', err);
      process.exit(1);
    } finally {
        await migrationClient.end();
    process.exit(0);
  }
};

runMigrations();