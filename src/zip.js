import fs from "fs";
import path from "path";
import zlib from "zlib";
import { incorrectCommand, incorrectInput } from "./errorsHandler.js";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import fsPromises from "fs/promises";
import { colours } from "./colours.js";

const FNF = "File not found!";

const compress = async ([pathSrc, pathDest]) => {
  if (!pathSrc || !pathDest) {
    incorrectInput();
    return;
  }

  try {
    await fs.promises.access(pathSrc);
  } catch {
    incorrectCommand(FNF);
    return;
  }

  try {
    await fs.promises.access(pathDest);
    const statsDest = await fsPromises.stat(pathDest);
    if (statsDest.isDirectory()) {
      incorrectCommand("This is folder!");
      return;
    }
  } catch {}

  const statsSrc = await fsPromises.stat(pathSrc);

  if (!statsSrc.isFile()) {
    incorrectCommand("This is folder!");
    return;
  }

  const nameDestDir = path.dirname(pathDest);
  try {
    await fs.promises.access(nameDestDir);
  } catch {
    await fs.promises.mkdir(nameDestDir);
  } finally {
    const nameDestFile = path.resolve(pathDest);
    const srcStream = createReadStream(path.resolve(pathSrc));
    const destStream = createWriteStream(nameDestFile);
    const brotli = zlib.createBrotliCompress();

    await pipeline(srcStream, brotli, destStream);

    console.log(
      colours.fg.green,
      `Successfully compressed into ${nameDestFile}\n`,
      colours.reset
    );
  }
};

const decompress = async ([pathSrc, pathDest]) => {
  if (!pathSrc || !pathDest) {
    incorrectInput();
    return;
  }

  try {
    await fs.promises.access(pathSrc);
  } catch {
    incorrectCommand(FNF);
    return;
  }

  try {
    await fs.promises.access(pathDest);
    const statsDest = await fsPromises.stat(pathDest);
    if (statsDest.isDirectory()) {
      incorrectCommand("This is folder!");
      return;
    }
  } catch {}

  const statsSrc = await fsPromises.stat(pathSrc);
  const nameDestDir = path.dirname(pathDest);

  if (!statsSrc.isFile()) {
    incorrectCommand("This is folder!");
    return;
  }

  try {
    await fs.promises.access(nameDestDir);
  } catch {
    await fs.promises.mkdir(nameDestDir);
  } finally {
    const nameDestFile = path.resolve(pathDest);
    const srcStream = createReadStream(path.resolve(pathSrc));
    const destStream = createWriteStream(nameDestFile);
    const brotli = zlib.createBrotliDecompress();

    try {
      await pipeline(srcStream, brotli, destStream);
    } catch (err) {
      await fs.promises.rm(nameDestFile);
      incorrectCommand("Decompress failed!");
      return;
    }

    console.log(
      colours.fg.green,
      `Successfully decompressed into ${nameDestFile}\n`,
      colours.reset
    );
  }
};

export { compress, decompress };
