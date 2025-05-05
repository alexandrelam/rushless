import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { schema } from "./schema.ts";
const { Pool } = pg;

export const db = drizzle({
    client: new Pool({
        connectionString: Deno.env.get("DATABASE_URL"),
    }),
    schema: { schema },
});
