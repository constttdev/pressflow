#!/usr/bin/env node

// node_modules/.pnpm/tsup@8.3.0_typescript@5.6.2/node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/index.ts
import { select as select2 } from "@clack/prompts";

// src/handler/svelte.ts
function handler() {
}

// src/handler/discordjs.ts
function handler2() {
}

// src/handler/hono.ts
import fs from "fs";
import path2 from "path";
import { text } from "@clack/prompts";
async function handler3() {
  const componentName = await text({
    message: "Whats the components name?",
    placeholder: "Example",
    validate(value) {
      if (value.length === 0) return `Value is required!`;
    }
  });
  const workingDir = String(process.cwd());
  fs.readdir(workingDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
    } else {
      let hasSrcFolder = false;
      files.forEach((file) => {
        const stats = fs.statSync(file);
        if (stats.isDirectory()) {
          if (file === "src") {
            hasSrcFolder = true;
          }
        }
      });
      if (hasSrcFolder) {
        fs.mkdirSync(path2.join(workingDir, "src", "routes"));
        const filePath = path2.join(
          workingDir,
          "src",
          "routes",
          `${String(componentName)}.ts`
        );
        const newRoute = path2.join(
          __dirname,
          "../",
          "src",
          "templates",
          "hono",
          "newRoute.ts"
        );
        fs.readFile(newRoute, "utf8", (err2, data) => {
          if (err2) {
            console.log(err2);
            return;
          }
          const replacedData = String(data).replaceAll(
            "{{componentName}}",
            String(componentName)
          );
          fs.writeFileSync(filePath, replacedData);
          console.log(
            `Sucesfully created the route named ${String(componentName)}`
          );
          console.log("");
          console.log("To now use the route use this example code block:");
          console.log("");
          console.log(`import books from './routes/${String(componentName)}'`);
          console.log("const app = new Hono()");
          console.log(`app.route('/authors', ${String(componentName)})`);
          console.log("export default app");
          console.log("");
          console.log("Thanks \u2764\uFE0F for choosing PressFlow");
        });
      } else {
        console.log(
          "This Project is not a valid project or didnt get setup right!"
        );
      }
    }
  });
}

// src/handler/expressjs.ts
function handler4() {
}

// src/index.ts
async function main() {
  if (process.argv[2] === "gen") {
    const selectFramework = await select2({
      message: "Pick a framework",
      options: [
        { value: "svelte", label: "Svelte \u{1F525}" },
        { value: "discordjs", label: "DiscordJS \u{1F916}" },
        { value: "expressjs", label: "ExpressJS \u{1F517}" },
        { value: "hono", label: "Hono \u26A1" }
      ]
    });
    if (selectFramework === "svelte") {
      handler();
    }
    if (selectFramework === "discordjs") {
      handler2();
    }
    if (selectFramework === "expressjs") {
      handler4();
    }
    if (selectFramework === "hono") {
      handler3();
    }
  }
}
main();
export {
  main
};
