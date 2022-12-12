import { access, constants } from "fs";
import path from "path";

const splitCommand = (commandLine) => {
  let splitted = commandLine.split(/ +/);
  let commandName = splitted[0];
  splitted.shift();
  return [commandName, splitted.join(" ")];
};

const splitPaths = async (currentPath, paths) => {
  paths = paths.split(" ");
  let src,
    dest,
    tempPath = [];
  paths.forEach((chunk) => {
    tempPath.push(chunk);
    const pathResolved = path.resolve(currentPath, tempPath.join(" "));
    access(pathResolved, constants.F_OK, (err) => {
      if (!err && !src) {
        [src, tempPath] = [pathResolved, []];
      }
    });
  });
  dest = path.resolve(currentPath, tempPath.join(" "));
  return [src, dest];
};

export { splitCommand, splitPaths };
