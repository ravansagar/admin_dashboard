import type { Config } from "drizzle-kit";

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: `${process.env.DATABASE_URL}?connect_timeout=30`,
  },
} satisfies Config;