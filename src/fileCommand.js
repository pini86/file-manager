import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { incorrectCommand } from "./errorsHandler.js";

const readFile = async (currentPath, toRead, rl) => {
  const readingStream = fs.ReadStream(
    path.resolve(currentPath, toRead),
    "utf8"
  );

  readingStream.on("data", (data) => process.stdout.write(data));
  readingStream.on("close", () => rl.prompt());
  readingStream.on("error", () => incorrectCommand("File not found!"));
};

const createFile = async (currentPath, nameNewFile, rl) => {
  const filePath = path.resolve(currentPath, nameNewFile);
  await fsPromises
    .writeFile(filePath, "", { flag: "wx" })
    .catch(() => incorrectCommand("File already exists!"))
    .finally(() => {
      rl.prompt();
    });
};

const renameFile = async ([oldPath, newPath], rl) => {
  await fsPromises
    .rename(oldPath, newPath)
    .catch(() => incorrectCommand("File not found!"))
    .finally(() => rl.prompt());
};

const copyFile = async ([src, dest], rl = null) => {
  if (!src) {
    incorrectCommand("File not found!");
    if (rl) {
      rl.prompt();
    }
    return;
  }

  try {
    await fs.promises.access(dest);
  } catch {
    await fs.promises.mkdir(dest);
  }

  const readableStream = fs.ReadStream(src, "utf8");
  const writableStream = fs.WriteStream(path.resolve(dest, path.basename(src)));

  readableStream.on("error", () => incorrectCommand());
  writableStream.on("error", () => incorrectCommand());

  readableStream.pipe(writableStream);

  if (rl) {
    rl.prompt();
  } else {
    return true;
  }
};

const moveFile = async ([src, dest], rl) => {
  copy([src, dest])
    .then((data) => {
      if (data) remove(src);
    })
    .catch(() => incorrectCommand("File not found!"))
    .finally(() => rl.prompt());
};

const removeFile = async (src, rl = null) => {
  await fsPromises
    .rm(src)
    .catch(() => incorrectCommand("File not found!"))
    .finally(() => {
      if (rl) {
        rl.prompt();
      }
    });
};

export { readFile, createFile, renameFile, copyFile, moveFile, removeFile };
