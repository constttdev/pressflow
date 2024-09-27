import { Hono, Context as HonoContext } from "hono";

const app = new Hono();

app.get(`/{{componentName}}`, (c: Hono<Context>) =>
  c.json(
    "This route was generated with the PressFlow CLI! Thanks for using our Project"
  )
);

export default app;
