import fs from "fs";
import path from "path";
import { select, cancel, text } from "@clack/prompts";

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
      "templates",
      "hono",
      "newRoute.ts"
    );

    const templateData = await fsPromises.readFile(templatePath, "utf8");
    const replacedData = templateData.replace(
      /{{componentName}}/g,
      String(componentName)
    );

    await fsPromises.writeFile(filePath, replacedData);

    console.log(
      `Successfully created the route named ${String(componentName)}!`
    );
    console.log(
      "\x1b[36mTo now use the route, use this example code block:\x1b[0m\n"
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
    console.log("\nThanks ❤️ for choosing PressFlow");
  } catch (err) {
    console.error("\x1b[30m\x1b[1mError:", err + "\x1b[0m");
  }
}
