import { Hono, Context as HonoContext } from "hono";

const {{componentName}} = new Hono();

{{componentName}}.get(`/{{componentName}}`, (c) =>
  c.json("Why did the C++ programmer get lost? He took the wrong branch.")
);

export default {{componentName}};
