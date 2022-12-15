import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { incorrectCommand } from "./errorsHandler.js";

const FNF = "File not found!";

const readFile = async (currentPath, toRead, rl) => {
  const readingStream = await fs.ReadStream(
    path.resolve(currentPath, toRead),
    "utf8"
  );

  readingStream.on("data", (chunk) => console.log(chunk));
  readingStream.on("close", () => rl.prompt());
  readingStream.on("error", () => incorrectCommand(FNF));
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
    .catch(() => incorrectCommand(FNF))
    .finally(() => rl.prompt());
};

const copyFile = async ([src, dest], rl = null) => {
  if (!src || !dest) {
    incorrectCommand(FNF);
    if (rl) {
      rl.prompt();
    }
    return;
  }

  try {
    await fs.promises.access(src);
  } catch {
    incorrectCommand(FNF);
    if (rl) {
      rl.prompt();
    }
    return;
  }
  const stats = await fsPromises.stat(src);

  if (!stats.isFile()) {
    incorrectCommand("This is folder!");
    if (rl) {
      rl.prompt();
    }
    return;
  }

  try {
    await fs.promises.access(dest);
  } catch {
    await fs.promises.mkdir(dest);
  } finally {
    const readableStream = fs.ReadStream(src, "utf8");
    readableStream.on("error", () => {
      incorrectCommand(FNF);
    });

    const writableStream = fs.WriteStream(
      path.resolve(dest, path.basename(src))
    );
    writableStream.on("error", () => {
      incorrectCommand(FNF);
    });

    readableStream.pipe(writableStream);
    if (rl) {
      rl.prompt();
    }
    return;
  }
};

const moveFile = async ([src, dest], rl) => {
  if (src === path.resolve(dest, path.basename(src))) {
    incorrectCommand("File exists!");
    if (rl) {
      rl.prompt();
    }
    return;
  }

  copyFile([src, dest])
    .then(() => removeFile(src))
    .catch(() => incorrectCommand(FNF))
    .finally(() => rl.prompt());
};

const removeFile = async (src, rl = null) => {
  await fsPromises
    .rm(src)
    .catch(() => incorrectCommand(FNF))
    .finally(() => {
      if (rl) {
        rl.prompt();
      }
    });
};

export { readFile, createFile, renameFile, copyFile, moveFile, removeFile };
