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
  const stats = await fsPromises.stat(pathSrc);

  if (!stats.isFile()) {
    incorrectCommand("This is folder!");
    return;
  }

  try {
    await fs.promises.access(pathDest);
  } catch {
    await fs.promises.mkdir(pathDest);
  } finally {
    const nameDestFile = path.resolve(pathDest, `${path.basename(pathSrc)}.br`);
    const srcStream = createReadStream(pathSrc);
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
  const stats = await fsPromises.stat(pathSrc);

  if (!stats.isFile()) {
    incorrectCommand("This is folder!");
    return;
  }

  try {
    await fs.promises.access(pathDest);
  } catch {
    await fs.promises.mkdir(pathDest);
  } finally {
    const nameDestFile = path.resolve(
      pathDest,
      `${path.basename(pathSrc, path.extname(pathSrc))}`
    );
    const srcStream = createReadStream(pathSrc);
    const destStream = createWriteStream(nameDestFile);
    const brotli = zlib.createBrotliDecompress();

    try {
      await pipeline(srcStream, brotli, destStream);
    } catch (err) {
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
