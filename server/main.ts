import { Hono } from 'hono'
import { db } from "./src/db/index.ts";
import { usersTable } from "./src/db/schema.ts";

const app = new Hono()

app.get('/ping', async (c) => {
  const command = new Deno.Command('git', {
    args: ['rev-parse', 'HEAD'],
    stdout: 'piped',
    stderr: 'piped'
  });

  // basic db test
  const result = await db.select().from(usersTable)

  console.log(result);

  const { stdout } = await command.output();
  const commitHash = new TextDecoder().decode(stdout).trim();

  return c.json({ commit: commitHash });
})

Deno.serve(app.fetch)
