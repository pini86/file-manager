import path from "path";

const splitCommand = (commandLine) => {
  let splitted = commandLine.split(/ +/);
  let commandName = splitted[0];
  splitted.shift();
  return [commandName, splitted.join(" ")];
};

const splitPaths = (currentPath, paths) => {
  if (!paths) {
    return ["", ""];
  }
  const pathsChunk = paths.split(" ");
  let dest = "";
  const src = path.resolve(currentPath, pathsChunk[0]);
  if (pathsChunk.length !== 1) {
    dest = path.resolve(currentPath, pathsChunk[1]);
  }
  return [src, dest];
};

export { splitCommand, splitPaths };
