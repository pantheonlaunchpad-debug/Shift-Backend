import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

export const sql = postgres(process.env.DATABASE_URL!);

// Test connection
(async () => {
  const now = await sql`SELECT NOW()`;
  console.log("Postgres connected:", now);
})();