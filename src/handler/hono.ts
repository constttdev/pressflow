import fs from "fs";

export function handler() {
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
