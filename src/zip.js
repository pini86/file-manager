import fs from "fs";
import path from "path";
import zlib from "zlib";
import { incorrectCommand, incorrectInput } from "./errorsHandler.js";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import fsPromises from "fs/promises";

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
      `\x1b[32mSuccessfully compressed into ${nameDestFile}\n\x1b[0m`
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
      `\x1b[32mSuccessfully decompressed into ${nameDestFile}\n\x1b[0m`
    );
  }
};

export { compress, decompress };
