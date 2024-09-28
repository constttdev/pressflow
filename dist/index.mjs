#!/usr/bin/env node

// node_modules/.pnpm/tsup@8.3.0_typescript@5.6.2/node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/index.ts
import { select as select5 } from "@clack/prompts";

// src/handler/svelte.ts
import fs from "fs";
import path2 from "path";
import { text } from "@clack/prompts";
var fsPromises = fs.promises;
async function handler() {
  const componentName = await text({
    message: "What's the component's name?",
    placeholder: "Example",
    validate(value) {
      if (value.length === 0) return "Value is required!";
    }
  });
  const workingDir = process.cwd();
  const srcDir = path2.join(workingDir, "src");
  const libDir = path2.join(srcDir, "lib");
  try {
    const files = await fsPromises.readdir(workingDir);
    const hasSrcFolder = files.includes("src");
    if (!hasSrcFolder) {
      console.error(
        "\x1B[31mThis project is not a valid project or didn't get set up right!\x1B[0m"
      );
      return;
    }
    const filePath = path2.join(libDir, `${String(componentName)}.svelte`);
    const templatePath = path2.join(
      __dirname,
      "../templates/svelte/component.ts"
    );
    const appHtmlPath = path2.join(srcDir, "app.html");
    const templateData = await fsPromises.readFile(templatePath, "utf8");
    const replacedData = templateData.replace(
      /{{componentName}}/g,
      String(componentName)
    );
    await fsPromises.writeFile(filePath, replacedData);
    console.log(
      `Successfully created the component named ${String(componentName)}!`
    );
    console.log(
      "\x1B[36mTo now use the component, add this line of code from below to your +layoute.svelte in your routes folder\x1B[0m\n"
    );
    console.log(`<${String(componentName)}></${String(componentName)}>`);
    console.log("");
    console.log("\nThanks \u2764\uFE0F for choosing PressFlow");
  } catch (err) {
    console.error("\x1B[30m\x1B[1mError:", err + "\x1B[0m");
  }
}

// src/handler/discordjs.ts
import fs2 from "fs";
import path3 from "path";
import { select as select2, text as text2 } from "@clack/prompts";
var fsPromises2 = fs2.promises;
async function handler2() {
  const componentType = await select2({
    message: "Pick a component type",
    options: [
      { value: "command", label: "Command" },
      { value: "event", label: "Event" }
    ]
  });
  if (String(componentType) === "command") {
    const componentName = await text2({
      message: "What's the component's name?",
      placeholder: "Example",
      validate(value) {
        if (value.length === 0) return "Value is required!";
      }
    });
    const componentDescription = await text2({
      message: "What's the component's description?",
      placeholder: "Example Description",
      validate(value) {
        if (value.length === 0) return "Value is required!";
      }
    });
    const workingDir = process.cwd();
    const srcDir = path3.join(workingDir, "src");
    const commandsDir = path3.join(srcDir, "commands");
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
      const filePath = path3.join(commandsDir, `${String(componentName)}.ts`);
      const templatePath = path3.join(
        __dirname,
        "../templates/discordjs/newCommand.ts"
      );
      const templateData = await fsPromises2.readFile(templatePath, "utf8");
      const replacedData = templateData.replace(
        /{{componentName}}/g,
        String(componentName)
      );
      await fsPromises2.writeFile(filePath, replacedData);
      console.log(
        `Successfully created a command named ${String(
          componentName
        )} with the description ${String(componentDescription)}!`
      );
      console.log(
        "\x1B[36mTo now use the command register it and then use the command handler!\x1B[0m\n"
      );
      console.log(
        "\x1B[30m\x1B[1mCommand Handler: https://discordjs.guide/creating-your-bot/command-handling.html#executing-commands\x1B[0m"
      );
      console.log(
        "\x1B[30m\x1B[1mCommand Register: https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands\x1B[0m"
      );
      console.log("\nThanks \u2764\uFE0F for choosing PressFlow");
    } catch (e) {
      console.log("\x1B[31m\x1B[1mError: " + e + "\x1B[0m");
    }
  }
  if (String(componentType) === "event") {
    const componentTrigger = await text2({
      message: "What's the events trigger?",
      placeholder: "Example",
      validate(value) {
        if (value.length === 0) return "Value is required!";
      }
    });
    const workingDir = process.cwd();
    const srcDir = path3.join(workingDir, "src");
    const eventsDir = path3.join(srcDir, "events");
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
      const filePath = path3.join(eventsDir, `${String(componentTrigger)}.ts`);
      const templatePath = path3.join(
        __dirname,
        "../templates/discordjs/newEvent.ts"
      );
      const templateData = await fsPromises2.readFile(templatePath, "utf8");
      const replacedData = templateData.replace(
        /{{componentTrigger}}/g,
        String(componentTrigger)
      );
      await fsPromises2.writeFile(filePath, replacedData);
      console.log(
        `Successfully created a event with the trigger ${String(
          componentTrigger
        )}!`
      );
      console.log("\x1B[36mTo now use the event, just start the bot!\x1B[0m\n");
      console.log(
        "\x1B[30m\x1B[1mEvent Handler: https://discordjs.guide/creating-your-bot/command-handling.html#executing-commands\x1B[0m"
      );
      console.log("");
      console.log("\nThanks \u2764\uFE0F for choosing PressFlow");
    } catch (e) {
      console.log("\x1B[31m\x1B[1mError: " + e + "\x1B[0m");
    }
  }
}

// src/handler/hono.ts
import fs3 from "fs";
import path4 from "path";
import { text as text3 } from "@clack/prompts";
var fsPromises3 = fs3.promises;
async function handler3() {
  const componentName = await text3({
    message: "What's the component's name?",
    placeholder: "Example",
    validate(value) {
      if (value.length === 0) return "Value is required!";
    }
  });
  const workingDir = process.cwd();
  const srcDir = path4.join(workingDir, "src");
  const routesDir = path4.join(srcDir, "routes");
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
    const filePath = path4.join(routesDir, `${String(componentName)}.ts`);
    const templatePath = path4.join(__dirname, "../templates/hono/newRoute.ts");
    const templateData = await fsPromises3.readFile(templatePath, "utf8");
    const replacedData = templateData.replace(
      /{{componentName}}/g,
      String(componentName)
    );
    await fsPromises3.writeFile(filePath, replacedData);
    console.log(
      `Successfully created the route named ${String(componentName)}!`
    );
    console.log(
      "\x1B[36mTo now use the route, use this example code block:\x1B[0m\n"
    );
    console.log(
      `import ${String(componentName)} from './routes/${String(componentName)}'`
    );
    console.log("const app = new Hono();");
    console.log(
      `app.route('/${String(componentName)}', ${String(componentName)});`
    );
    console.log("export default app;");
    console.log("");
    console.log("\nThanks \u2764\uFE0F for choosing PressFlow");
  } catch (err) {
    console.error("\x1B[30m\x1B[1mError:", err + "\x1B[0m");
  }
}

// src/handler/expressjs.ts
import fs4 from "fs";
import path5 from "path";
import { text as text4 } from "@clack/prompts";
var fsPromises4 = fs4.promises;
async function handler4() {
  const componentName = await text4({
    message: "What's the component's name?",
    placeholder: "Example",
    validate(value) {
      if (value.length === 0) return "Value is required!";
    }
  });
  const workingDir = process.cwd();
  const srcDir = path5.join(workingDir, "src");
  const routesDir = path5.join(srcDir, "routes");
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
    const filePath = path5.join(routesDir, `${String(componentName)}.ts`);
    const templatePath = path5.join(
      __dirname,
      "../templates/expressjs/newRoute.ts"
    );
    const templateData = await fsPromises4.readFile(templatePath, "utf8");
    const replacedData = templateData.replace(
      /{{componentName}}/g,
      String(componentName)
    );
    await fsPromises4.writeFile(filePath, replacedData);
    console.log(
      `Successfully created the route named ${String(componentName)}!`
    );
    console.log(
      "\x1B[36mTo now use the route, use this example code block:\x1B[0m\n"
    );
    console.log(
      `import ${String(componentName)} from './routes/${String(componentName)}'`
    );
    console.log("const app = express.Router();");
    console.log(
      `app.use('/${String(componentName)}', ${String(componentName)});`
    );
    console.log("module.exports = app;");
    console.log("");
    console.log("\nThanks \u2764\uFE0F for choosing PressFlow");
  } catch (err) {
    console.error("Error:", err);
  }
}

// src/index.ts
async function main() {
  if (process.argv[2] === "gen") {
    const selectFramework = await select5({
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
