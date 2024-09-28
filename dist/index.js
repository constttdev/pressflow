#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  main: () => main
});
module.exports = __toCommonJS(src_exports);
var import_prompts2 = require("@clack/prompts");

// src/handler/svelte.ts
function handler() {
}

// src/handler/discordjs.ts
function handler2() {
}

// src/handler/hono.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_prompts = require("@clack/prompts");
async function handler3() {
  const componentName = await (0, import_prompts.text)({
    message: "Whats the components name?",
    placeholder: "Example",
    validate(value) {
      if (value.length === 0) return `Value is required!`;
    }
  });
  const workingDir = String(process.cwd());
  import_fs.default.readdir(workingDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
    } else {
      let hasSrcFolder = false;
      files.forEach((file) => {
        const stats = import_fs.default.statSync(file);
        if (stats.isDirectory()) {
          if (file === "src") {
            hasSrcFolder = true;
          }
        }
      });
      if (hasSrcFolder) {
        const workingDirSRC = import_path.default.join(String(process.cwd()));
        console.log("WorkingDirSRC: " + workingDirSRC);
        import_fs.default.readdir(workingDirSRC, (err2, filesSRC) => {
          if (err2) {
            console.log("Error reading src directory:", err2);
          } else {
            let hasRoutesFolder = false;
            files.forEach((filesSRC2) => {
              const statsSrc = import_fs.default.statSync(filesSRC2);
              if (statsSrc.isDirectory()) {
                hasRoutesFolder = true;
              }
            });
          }
        });
        if (hasSrcFolder) {
          const filePath = import_path.default.join(
            workingDir,
            "src",
            "routes",
            `${String(componentName)}.ts`
          );
          const newRoute = import_path.default.join(
            __dirname,
            "../",
            "src",
            "templates",
            "hono",
            "newRoute.ts"
          );
          import_fs.default.readFile(newRoute, "utf8", (err2, data) => {
            if (err2) {
              console.log(err2);
              return;
            }
            const replacedData = String(data).replaceAll(
              "{{componentName}}",
              String(componentName)
            );
            import_fs.default.writeFileSync(filePath, replacedData);
            console.log(
              `Sucesfully created the route named ${String(componentName)}`
            );
            console.log("");
            console.log(
              "\x1B[36mTo now use the route use this example code block:\x1B[0m"
            );
            console.log("");
            console.log(
              `import ${String(componentName)} from './routes/${String(
                componentName
              )}'`
            );
            console.log("const app = new Hono()");
            console.log(
              `app.route('/${String(componentName)}', ${String(componentName)})`
            );
            console.log("export default app");
            console.log("");
            console.log("Thanks \u2764\uFE0F for choosing PressFlow");
          });
        }
        if (!hasSrcFolder) {
          import_fs.default.mkdirSync(import_path.default.join(workingDir, "src", "routes"));
          const filePath = import_path.default.join(
            workingDir,
            "src",
            "routes",
            `${String(componentName)}.ts`
          );
          const newRoute = import_path.default.join(
            __dirname,
            "../",
            "src",
            "templates",
            "hono",
            "newRoute.ts"
          );
          import_fs.default.readFile(newRoute, "utf8", (err2, data) => {
            if (err2) {
              console.log(err2);
              return;
            }
            const replacedData = String(data).replaceAll(
              "{{componentName}}",
              String(componentName)
            );
            import_fs.default.writeFileSync(filePath, replacedData);
            console.log(
              `Sucesfully created the route named ${String(componentName)}`
            );
            console.log("");
            console.log(
              "\x1B[36mTo now use the route use this example code block:\x1B[0m"
            );
            console.log("");
            console.log(
              `import ${String(componentName)} from './routes/${String(
                componentName
              )}'`
            );
            console.log("const app = new Hono()");
            console.log(
              `app.route('/${String(componentName)}', ${String(componentName)})`
            );
            console.log("export default app");
            console.log("");
            console.log("Thanks \u2764\uFE0F for choosing PressFlow");
          });
        }
      } else {
        console.log(
          "\x1B[31mThis Project is not a valid project or didnt get setup right!\x1B[0m"
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
    const selectFramework = await (0, import_prompts2.select)({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
