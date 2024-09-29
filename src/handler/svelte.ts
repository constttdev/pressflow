import fs from "fs";
import path from "path";
import { select, cancel, text, confirm } from "@clack/prompts";

const fsPromises = fs.promises;

export async function handler() {
  const componentName = await text({
    message: "What's the component's name?",
    placeholder: "Example",
    validate(value) {
      if (value.length === 0) return "Value is required!";
    },
  });

  const workingDir = process.cwd();
  const srcDir = path.join(workingDir, "src");
  const libDir = path.join(srcDir, "lib");

  try {
    const files = await fsPromises.readdir(workingDir);
    const hasSrcFolder = files.includes("src");

    if (!hasSrcFolder) {
      console.error(
        "\u001b[31mThis project is not a valid project or didn't get set up right!\x1b[0m"
      );
      return;
    }

    const filePath = path.join(libDir, `${String(componentName)}.svelte`);
    const templatePath = path.join(
      __dirname,
      "..",
      "..",
      "templates",
      "svelte",
      "component.ts"
    );
    const appHtmlPath = path.join(srcDir, "app.html");

    const templateData = await fsPromises.readFile(templatePath, "utf8");
    const replacedData = templateData.replace(
      /{{componentName}}/g,
      String(componentName)
    );

    if (fs.existsSync(filePath)) {
      const shouldContinue = await confirm({
        message:
          "The component you are trying to create already exists, do you want to continue?",
      });
      if (shouldContinue) {
        await fsPromises.writeFile(filePath, replacedData);
      }
      if (!shouldContinue) {
        cancel("Operation cancelled");
        process.exit(0);
      }
    }

    console.log(
      `Successfully created the component named ${String(componentName)}!`
    );
    console.log(
      "\x1b[36mTo now use the component, add this line of code from below to your +layoute.svelte in your routes folder\x1b[0m\n"
    );
    console.log(`<${String(componentName)}></${String(componentName)}>`);
    console.log("");
    console.log("\nThanks ❤️ for choosing PressFlow");
  } catch (err) {
    console.error("\x1b[30m\x1b[1mError:", err + "\x1b[0m");
  }
}
