import { defineConfig } from "drizzle-kit";

console.log(process.env.PG_STRING);

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./drizzle/*",
  dbCredentials: {
    url: process.env.PG_STRING!,
  },
});
