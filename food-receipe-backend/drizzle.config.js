import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: './db/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_String,
  },
});
