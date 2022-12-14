import path from "path";
import fs from "fs";
import { incorrectCommand } from "./errorsHandler.js";

const up = (currentPath) => {
  return path.resolve(currentPath, "..");
};

const cd = (currentPath, additional) => {
  const newPath = path.resolve(currentPath, additional);
  if (!fs.existsSync(newPath)) incorrectCommand("File or directory not found!");
  else if (!fs.lstatSync(newPath).isDirectory())
    incorrectCommand("Directory not found!");
  return fs.existsSync(newPath) && fs.lstatSync(newPath).isDirectory()
    ? newPath
    : currentPath;
};

const list = async (folder) => {
  const result = await fs.promises.readdir(folder, { withFileTypes: true });
  const listDirectories = result
    .filter((item) => item.isDirectory())
    .sort((a, b) => a.name > b.name)
    .map((item) => (item = { ...item, type: "directory" }));
  const listFiles = result
    .filter((item) => item.isFile())
    .sort((a, b) => a.name > b.name)
    .map((item) => (item = { ...item, type: "file" }));
  const listLinks = result
    .filter((item) => item.isSymbolicLink())
    .sort((a, b) => a.name > b.name)
    .map((item) => (item = { ...item, type: "symbolic link" }));
  console.table([...listDirectories, ...listLinks, ...listFiles]);
};

export { up, cd, list };
