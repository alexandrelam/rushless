import { Hono } from 'hono'

const app = new Hono()

app.get('/ping', async (c) => {
  const command = new Deno.Command('git', {
    args: ['rev-parse', 'HEAD'],
    stdout: 'piped',
    stderr: 'piped'
  });

  const { stdout } = await command.output();
  const commitHash = new TextDecoder().decode(stdout).trim();

  return c.json({ commit: commitHash });
})

Deno.serve(app.fetch)
