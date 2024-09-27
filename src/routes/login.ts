import { Hono, Context as HonoContext } from "hono";

const app = new Hono();

app.get(`/login`, (c: Hono<Context>) =>
  c.json("Why did the C++ programmer get lost? He took the wrong branch.")
);

export default app;
