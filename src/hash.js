import path from "path";
import crypto from "crypto";
import { incorrectCommand } from "./errorsHandler.js";
import fsPromises from "fs/promises";

const getHash = async (currentDir, fileName, rl) => {
  await fsPromises
    .readFile(path.resolve(currentDir, fileName))
    .then((data) => {
      const hashFile = crypto.createHash("sha256").update(data).digest("hex");
      console.log(hashFile);
    })
    .catch(() => {
      incorrectCommand("File not find!");
    })
    .finally(() => {
      rl.prompt();
    });
};

export { getHash };
