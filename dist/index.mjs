#!/usr/bin/env node

// node_modules/.pnpm/tsup@8.3.0_typescript@5.6.2/node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/index.ts
import { select } from "@clack/prompts";

// src/handler/svelte.ts
function handler() {
}

// src/handler/discordjs.ts
function handler2() {
}

// src/handler/hono.ts
import fs from "fs";
function handler3() {
  fs.readdir(__dirname, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
    } else {
      console.log("\nCurrent directory filenames:");
      files.forEach((file) => {
        console.log(file);
      });
    }
  });
}

// src/handler/expressjs.ts
function handler4() {
}

// src/index.ts
async function main() {
  if (process.argv[2] === "gen") {
    const selectFramework = await select({
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
