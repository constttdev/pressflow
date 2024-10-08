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
var import_prompts5 = require("@clack/prompts");

// src/handler/svelte.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_prompts = require("@clack/prompts");
var fsPromises = import_fs.default.promises;
async function handler() {
  const componentName = await (0, import_prompts.text)({
    message: "What's the component's name?",
    placeholder: "Example",
    validate(value) {
      if (value.length === 0) return "Value is required!";
    }
  });
  const workingDir = process.cwd();
  const srcDir = import_path.default.join(workingDir, "src");
  const libDir = import_path.default.join(srcDir, "lib");
  try {
    const files = await fsPromises.readdir(workingDir);
    const hasSrcFolder = files.includes("src");
    if (!hasSrcFolder) {
      console.error(
        "\x1B[31mThis project is not a valid project or didn't get set up right!\x1B[0m"
      );
      return;
    }
    const filePath = import_path.default.join(libDir, `${String(componentName)}.svelte`);
    const templatePath = import_path.default.join(
      __dirname,
      "..",
      "..",
      "templates",
      "svelte",
      "component.ts"
    );
    const appHtmlPath = import_path.default.join(srcDir, "app.html");
    const templateData = await fsPromises.readFile(templatePath, "utf8");
    const replacedData = templateData.replace(
      /{{componentName}}/g,
      String(componentName)
    );
    if (import_fs.default.existsSync(filePath)) {
      const shouldContinue = await (0, import_prompts.confirm)({
        message: "The component you are trying to create already exists, do you want to continue?"
      });
      if (shouldContinue) {
        await fsPromises.writeFile(filePath, replacedData);
      }
      if (!shouldContinue) {
        (0, import_prompts.cancel)("Operation cancelled");
        process.exit(0);
      }
    }
    (0, import_prompts.outro)(
      `Successfully created the component named ${String(
        componentName
      )}!
\x1B[36mTo now use the component, add this line of code from below to your +layoute.svelte in your routes folder\x1B[0m
<${String(
        componentName
      )}></${String(componentName)}>

Thanks \u2764\uFE0F for choosing PressFlow`
    );
  } catch (err) {
    console.error("\x1B[30m\x1B[1mError:", err + "\x1B[0m");
  }
}

// src/handler/discordjs.ts
var import_fs2 = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));
var import_prompts2 = require("@clack/prompts");
var fsPromises2 = import_fs2.default.promises;
async function handler2() {
  const componentType = await (0, import_prompts2.select)({
    message: "Pick a component type",
    options: [
      { value: "command", label: "Command" },
      { value: "event", label: "Event" }
    ]
  });
  if (String(componentType) === "command") {
    const componentName = await (0, import_prompts2.text)({
      message: "What's the component's name?",
      placeholder: "Example",
      validate(value) {
        if (value.length === 0) return "Value is required!";
      }
    });
    const componentDescription = await (0, import_prompts2.text)({
      message: "What's the component's description?",
      placeholder: "Example Description",
      validate(value) {
        if (value.length === 0) return "Value is required!";
      }
    });
    const workingDir = process.cwd();
    const srcDir = import_path2.default.join(workingDir, "src");
    const commandsDir = import_path2.default.join(srcDir, "commands");
    try {
      const files = await fsPromises2.readdir(workingDir);
      const hasSrcFolder = files.includes("src");
      if (!hasSrcFolder) {
        console.error(
          "\x1B[31mThis project is not a valid project or didn't get set up right!\x1B[0m"
        );
        console.log("\x1B[30m\x1B[1mError: SRC folder not found!\x1B[0m");
        return;
      }
      const srcFiles = await fsPromises2.readdir(srcDir);
      const hasCommandFolder = srcFiles.includes("commands");
      if (!hasCommandFolder) {
        await fsPromises2.mkdir(commandsDir);
      }
      const filePath = import_path2.default.join(commandsDir, `${String(componentName)}.js`);
      const templatePath = import_path2.default.join(
        __dirname,
        "..",
        "..",
        "templates",
        "discordjs",
        "newCommand.ts"
      );
      const templateData = await fsPromises2.readFile(templatePath, "utf8");
      const replacedData = templateData.replace(
        /{{componentName}}/g,
        String(componentName)
      );
      const replacedData2 = replacedData.replace(
        /{{componentDescription}}/g,
        String(componentDescription)
      );
      if (import_fs2.default.existsSync(filePath)) {
        const shouldContinue = await (0, import_prompts2.confirm)({
          message: "The command you are trying to create already exists, do you want to continue?"
        });
        if (shouldContinue) {
          await fsPromises2.writeFile(filePath, replacedData2);
        }
        if (!shouldContinue) {
          (0, import_prompts2.cancel)("Operation cancelled");
          process.exit(0);
        }
      }
      (0, import_prompts2.outro)(
        `Sucessfully created command name ${String(
          componentName
        )} with description ${String(
          componentDescription
        )}
\x1B[36mTo now use the command create a new folder in the commands directory or move it in one. After that register it and check that you have a command handler!\x1B[0m
\x1B[30m\x1B[1mCommand Handler: https://discordjs.guide/creating-your-bot/command-handling.html#executing-commands\x1B[0m
\x1B[30m\x1B[1mCommand Register: https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands\x1B[0m

Thanks \u2764\uFE0F for choosing PressFlow`
      );
    } catch (e) {
      console.log("\x1B[31m\x1B[1mError: " + e + "\x1B[0m");
    }
  }
  if (String(componentType) === "event") {
    const componentTrigger = await (0, import_prompts2.text)({
      message: "What's the events trigger?",
      placeholder: "Example",
      validate(value) {
        if (value.length === 0) return "Value is required!";
      }
    });
    const workingDir = process.cwd();
    const srcDir = import_path2.default.join(workingDir, "src");
    const eventsDir = import_path2.default.join(srcDir, "events");
    try {
      const files = await fsPromises2.readdir(workingDir);
      const hasSrcFolder = files.includes("src");
      if (!hasSrcFolder) {
        console.error(
          "\x1B[31mThis project is not a valid project or didn't get set up right!\x1B[0m"
        );
        console.log("\x1B[30m\x1B[1mError: SRC folder not found!\x1B[0m");
        return;
      }
      const srcFiles = await fsPromises2.readdir(srcDir);
      const hasEventsFolder = srcFiles.includes("events");
      if (!hasEventsFolder) {
        await fsPromises2.mkdir(eventsDir);
      }
      const filePath = import_path2.default.join(eventsDir, `${String(componentTrigger)}.js`);
      const templatePath = import_path2.default.join(
        __dirname,
        "..",
        "..",
        "templates",
        "discordjs",
        "newEvent.ts"
      );
      const templateData = await fsPromises2.readFile(templatePath, "utf8");
      const replacedData = templateData.replace(
        /{{componentTrigger}}/g,
        String(componentTrigger)
      );
      if (import_fs2.default.existsSync(filePath)) {
        const shouldContinue = await (0, import_prompts2.confirm)({
          message: "The event you are trying to create already exists, do you want to continue?"
        });
        if (shouldContinue) {
          await fsPromises2.writeFile(filePath, replacedData);
        }
        if (!shouldContinue) {
          (0, import_prompts2.cancel)("Operation cancelled");
          process.exit(0);
        }
      }
      (0, import_prompts2.outro)(
        `Sucessfully created a event with the trigger ${String(
          componentTrigger
        )}!
\x1B[36mTo now use the event, just start the bot!\x1B[0m
\x1B[30m\x1B[1mEvent Handler: https://discordjs.guide/creating-your-bot/command-handling.html#executing-commands\x1B[0m

Thanks \u2764\uFE0F for choosing PressFlow`
      );
    } catch (e) {
      console.log("\x1B[31m\x1B[1mError: " + e + "\x1B[0m");
    }
  }
}

// src/handler/hono.ts
var import_fs3 = __toESM(require("fs"));
var import_path3 = __toESM(require("path"));
var import_prompts3 = require("@clack/prompts");
var fsPromises3 = import_fs3.default.promises;
async function handler3() {
  const componentName = await (0, import_prompts3.text)({
    message: "What's the component's name?",
    placeholder: "Example",
    validate(value) {
      if (value.length === 0) return "Value is required!";
    }
  });
  const workingDir = process.cwd();
  const srcDir = import_path3.default.join(workingDir, "src");
  const routesDir = import_path3.default.join(srcDir, "routes");
  try {
    const files = await fsPromises3.readdir(workingDir);
    const hasSrcFolder = files.includes("src");
    if (!hasSrcFolder) {
      console.error(
        "\x1B[31mThis project is not a valid project or didn't get set up right!\x1B[0m"
      );
      return;
    }
    const srcFiles = await fsPromises3.readdir(srcDir);
    const hasRoutesFolder = srcFiles.includes("routes");
    if (!hasRoutesFolder) {
      await fsPromises3.mkdir(routesDir);
    }
    const filePath = import_path3.default.join(routesDir, `${String(componentName)}.ts`);
    const templatePath = import_path3.default.join(
      __dirname,
      "..",
      "..",
      "templates",
      "hono",
      "newRoute.ts"
    );
    const templateData = await fsPromises3.readFile(templatePath, "utf8");
    const replacedData = templateData.replace(
      /{{componentName}}/g,
      String(componentName)
    );
    if (import_fs3.default.existsSync(filePath)) {
      const shouldContinue = await (0, import_prompts3.confirm)({
        message: "The route you are trying to create already exists, do you want to continue?"
      });
      if (shouldContinue) {
        await fsPromises3.writeFile(filePath, replacedData);
      }
      if (!shouldContinue) {
        (0, import_prompts3.cancel)("Operation cancelled");
        process.exit(0);
      }
    }
    (0, import_prompts3.outro)(
      `Successfully created the route named ${String(
        componentName
      )}!
\x1B[36mTo now use the route, use this example code block:\x1B[0m
import ${String(
        componentName
      )} from './routes/${String(
        componentName
      )}
const app = new Hono();
app.route('/${String(
        componentName
      )}', ${String(
        componentName
      )});
export default app;

Thanks \u2764\uFE0F for choosing PressFlow`
    );
  } catch (err) {
    console.error("\x1B[30m\x1B[1mError:", err + "\x1B[0m");
  }
}

// src/handler/expressjs.ts
var import_fs4 = __toESM(require("fs"));
var import_path4 = __toESM(require("path"));
var import_prompts4 = require("@clack/prompts");
var fsPromises4 = import_fs4.default.promises;
async function handler4() {
  const componentName = await (0, import_prompts4.text)({
    message: "What's the component's name?",
    placeholder: "Example",
    validate(value) {
      if (value.length === 0) return "Value is required!";
    }
  });
  const workingDir = process.cwd();
  const srcDir = import_path4.default.join(workingDir, "src");
  const routesDir = import_path4.default.join(srcDir, "routes");
  try {
    const files = await fsPromises4.readdir(workingDir);
    const hasSrcFolder = files.includes("src");
    if (!hasSrcFolder) {
      console.error(
        "\x1B[31mThis project is not a valid project or didn't get set up right!\x1B[0m"
      );
      return;
    }
    const srcFiles = await fsPromises4.readdir(srcDir);
    const hasRoutesFolder = srcFiles.includes("routes");
    if (!hasRoutesFolder) {
      await fsPromises4.mkdir(routesDir);
      console.log("Created 'routes' directory.");
    }
    const filePath = import_path4.default.join(routesDir, `${String(componentName)}.ts`);
    const templatePath = import_path4.default.join(
      __dirname,
      "..",
      "..",
      "templates",
      "expressjs",
      "newRoute.ts"
    );
    const templateData = await fsPromises4.readFile(templatePath, "utf8");
    const replacedData = templateData.replace(
      /{{componentName}}/g,
      String(componentName)
    );
    if (import_fs4.default.existsSync(filePath)) {
      const shouldContinue = await (0, import_prompts4.confirm)({
        message: "The route you are trying to create already exists, do you want to continue?"
      });
      if (shouldContinue) {
        await fsPromises4.writeFile(filePath, replacedData);
      }
      if (!shouldContinue) {
        (0, import_prompts4.cancel)("Operation cancelled");
        process.exit(0);
      }
    }
    (0, import_prompts4.outro)(
      `Successfully created the route named ${String(
        componentName
      )}!
\x1B[36mTo now use the route, use this example code block:\x1B[0m
import ${String(
        componentName
      )} from './routes/${String(
        componentName
      )}
const app = express.Router();
app.use('/${String(
        componentName
      )}', ${String(
        componentName
      )});
module.exports = app;

Thanks \u2764\uFE0F for choosing PressFlow`
    );
  } catch (err) {
    console.error("Error:", err);
  }
}

// src/index.ts
async function main() {
  if (process.argv[2] === "gen") {
    const selectFramework = await (0, import_prompts5.select)({
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
