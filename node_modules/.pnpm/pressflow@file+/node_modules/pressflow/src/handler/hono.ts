import fs from "fs";
import path from "path";
import { select, cancel, text } from "@clack/prompts";

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
        const workingDirSRC = path.join(String(process.cwd()), "src");
        fs.readdir(workingDirSRC, (err, filesSRC) => {
          if (err) {
            console.log("Error reading src directory:", err);
          } else {
            let hasRoutesFolder: boolean = false;
            files.forEach((filesSRC) => {
              const statsSrc = fs.statSync(filesSRC);
              if (statsSrc.isDirectory()) {
                hasRoutesFolder = true;
              }
            });
          }
        });
        if (hasSrcFolder) {
          // Routes folder exists
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
              "\x1b[36mTo now use the route use this example code block:\x1b[0m"
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
        }
        if (!hasSrcFolder) {
          // Routes Folder doesnt exist
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
              "\x1b[36mTo now use the route use this example code block:\x1b[0m"
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
        }
      } else {
        // src doesnt exsit
        console.log(
          "\u001b[31mThis Project is not a valid project or didnt get setup right!\x1b[0m"
        );
      }
    }
  });
}
