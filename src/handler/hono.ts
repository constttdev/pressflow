import fs from "fs";
import path from "path";
import { select, cancel, text } from "@clack/prompts";
var colors = require("colors");

export async function handler() {
  const componentName = await text({
    message: "Whats the components name?",
    placeholder: "Example",
    validate(value) {
      if (value.length === 0) return `Value is required!`;
    },
  });

  const workingDir = String(process.cwd());
  fs.readdir(workingDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
    } else {
      let hasSrcFolder: boolean = false;
      files.forEach((file) => {
        const stats = fs.statSync(file);
        if (stats.isDirectory()) {
          if (file === "src") {
            hasSrcFolder = true;
          }
        }
      });
      if (hasSrcFolder) {
        // src exists
        fs.mkdirSync(path.join(workingDir, "src", "routes"));

        const filePath = path.join(
          workingDir,
          "src",
          "routes",
          `${String(componentName)}.ts`
        );
        const newRoute = path.join(
          __dirname,
          "../",
          "src",
          "templates",
          "hono",
          "newRoute.ts"
        );
        fs.readFile(newRoute, "utf8", (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          const replacedData = String(data).replaceAll(
            "{{componentName}}",
            String(componentName)
          );
          fs.writeFileSync(filePath, replacedData);
          console.log(
            `Sucesfully created the route named ${String(componentName)!}`
          );
          console.log("");
          console.log(
            colors.cyan + "To now use the route use this example code block:"
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
          console.log("Thanks ❤️ for choosing PressFlow");
        });
      } else {
        // src doesnt exsit
        console.log(
          "This Project is not a valid project or didnt get setup right!"
        );
      }
    }
  });
}
