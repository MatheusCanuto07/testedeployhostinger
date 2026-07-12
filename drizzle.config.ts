import "dotenv/config";

import { defineConfig } from "drizzle-kit";

const runtime = globalThis as typeof globalThis & {
  process?: {
    env?: Record<string, string | undefined>;
  };
};

const dbHost = runtime.process?.env?.DB_HOST;
const dbPort = runtime.process?.env?.DB_PORT;
const dbUser = runtime.process?.env?.DB_USER;
const dbPassword = runtime.process?.env?.DB_PASSWORD;
const dbName = runtime.process?.env?.DB_NAME;

if (!dbHost || !dbPort || !dbUser || !dbPassword || !dbName) {
  throw new Error(
    "Variáveis de conexão do banco não foram configuradas corretamente.",
  );
}

export const databaseUrl = `mysql://${encodeURIComponent(dbUser)}:${encodeURIComponent(dbPassword)}@${dbHost}:${dbPort}/${dbName}`;
console.log("Database URL:", databaseUrl);

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: databaseUrl,
  },
});
