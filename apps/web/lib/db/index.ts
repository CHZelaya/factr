import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

/**
 * Creates Neon HTTP client and Drizzle ORM instance for database operations.
 */
export const db = drizzle(neon(process.env.DATABASE_URL!));
