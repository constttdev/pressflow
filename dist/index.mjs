var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/.pnpm/tsup@8.3.0_typescript@5.6.2/node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var getFilename, getDirname, __dirname;
var init_esm_shims = __esm({
  "node_modules/.pnpm/tsup@8.3.0_typescript@5.6.2/node_modules/tsup/assets/esm_shims.js"() {
    "use strict";
    getFilename = () => fileURLToPath(import.meta.url);
    getDirname = () => path.dirname(getFilename());
    __dirname = /* @__PURE__ */ getDirname();
  }
});

// src/handler/svelte.ts
function handler() {
}
var init_svelte = __esm({
  "src/handler/svelte.ts"() {
    "use strict";
    init_esm_shims();
  }
});

// src/handler/discordjs.ts
function handler2() {
}
var init_discordjs = __esm({
  "src/handler/discordjs.ts"() {
    "use strict";
    init_esm_shims();
  }
});

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
var init_hono = __esm({
  "src/handler/hono.ts"() {
    "use strict";
    init_esm_shims();
  }
});

// src/handler/expressjs.ts
function handler4() {
}
var init_expressjs = __esm({
  "src/handler/expressjs.ts"() {
    "use strict";
    init_esm_shims();
  }
});

// src/index.ts
import { select } from "@clack/prompts";
var require_src = __commonJS({
  "src/index.ts"(exports, module) {
    init_esm_shims();
    init_svelte();
    init_discordjs();
    init_hono();
    init_expressjs();
    async function main() {
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
    main();
    module.exports = main;
  }
});
export default require_src();
