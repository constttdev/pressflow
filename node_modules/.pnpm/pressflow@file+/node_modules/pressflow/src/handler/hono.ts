import fs from "fs";
import path from "path";
import { select, cancel, text, confirm, outro } from "@clack/prompts";

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
  const routesDir = path.join(srcDir, "routes");

  try {
    const files = await fsPromises.readdir(workingDir);
    const hasSrcFolder = files.includes("src");

    if (!hasSrcFolder) {
      console.error(
        "\u001b[31mThis project is not a valid project or didn't get set up right!\x1b[0m"
      );
      return;
    }

    const srcFiles = await fsPromises.readdir(srcDir);
    const hasRoutesFolder = srcFiles.includes("routes");

    if (!hasRoutesFolder) {
      await fsPromises.mkdir(routesDir);
    }

    const filePath = path.join(routesDir, `${String(componentName)}.ts`);
    const templatePath = path.join(
      __dirname,
      "..",
      "..",
      "templates",
      "hono",
      "newRoute.ts"
    );

    const templateData = await fsPromises.readFile(templatePath, "utf8");
    const replacedData = templateData.replace(
      /{{componentName}}/g,
      String(componentName)
    );

    if (fs.existsSync(filePath)) {
      const shouldContinue = await confirm({
        message:
          "The route you are trying to create already exists, do you want to continue?",
      });
      if (shouldContinue) {
        await fsPromises.writeFile(filePath, replacedData);
      }
      if (!shouldContinue) {
        cancel("Operation cancelled");
        process.exit(0);
      }
    }

    outro(
      `Successfully created the route named ${String(
        componentName
      )}!\n\x1b[36mTo now use the route, use this example code block:\x1b[0m\nimport ${String(
        componentName
      )} from './routes/${String(
        componentName
      )}\nconst app = new Hono();\napp.route('/${String(
        componentName
      )}', ${String(
        componentName
      )});\nexport default app;\n\nThanks ❤️ for choosing PressFlow`
    );
  } catch (err) {
    console.error("\x1b[30m\x1b[1mError:", err + "\x1b[0m");
  }
}
