import { stdin as input, stdout as output } from "process";
import * as readline from "readline";
import path from "path";
import * as operatingSystem from "./operatingSystem.js";
import { splitCommand, splitPaths } from "./utility.js";
import { incorrectInput } from "./errorsHandler.js";
import { getHash } from "./hash.js";
import {
  readFile,
  createFile,
  renameFile,
  copyFile,
  moveFile,
  removeFile,
} from "./fileCommand.js";
import { up, cd, list } from "./nwd.js";

const rl = readline.createInterface({
  input,
  output,
});

const fm = () => {
  const USER = process.argv[process.argv.indexOf("--user-name") + 1];
  let currentDir = operatingSystem.getHomeDir();

  if (!process.argv.includes("--user-name")) {
    console.log("'--user-name' shuld be exist");
    process.exit(0);
  } else console.log(`\x1b[35mWelcome to the File Manager, ${USER}!\n\x1b[0m`);
  rl.setPrompt(`\x1b[33mYou are currently in ${currentDir} >\n\x1b[0m`);
  rl.prompt();

  rl.on("line", async (line) => {
    let [comandName, comandContent] = splitCommand(line);
    switch (comandName) {
      case "up":
        currentDir = up(currentDir);
        rl.setPrompt(`\x1b[36mYou are currently in ${currentDir} >\n\x1b[0m`);
        rl.prompt();
        break;

      case "cd":
        currentDir = cd(currentDir, comandContent);
        rl.setPrompt(`\x1b[36mYou are currently in ${currentDir} >\n\x1b[0m`);
        rl.prompt();
        break;

      case "ls":
        list(currentDir);
        rl.prompt();
        break;

      case "cat":
        await readFile(currentDir, comandContent, rl);
        break;

      case "add":
        await createFile(currentDir, comandContent, rl);
        break;

      case "rn":
        await renameFile(splitPaths(currentDir, comandContent), rl);
        break;

      case "cp":
        await copyFile(splitPaths(currentDir, comandContent), rl);
        break;

      case "mv":
        await moveFile(splitPaths(currentDir, comandContent), rl);
        break;

      case "rm":
        await removeFile(path.resolve(currentDir, comandContent), rl);
        break;

      case "os":
        switch (comandContent) {
          case "--EOL":
            console.log(operatingSystem.getOsInfo());
            break;
          case "--cpus":
            console.table(operatingSystem.getCpus());
            break;
          case "--homedir":
            console.log(operatingSystem.getHomeDir());
            break;
          case "--username":
            console.log(operatingSystem.getUserName());
            break;
          case "--architecture":
            console.log(operatingSystem.getArch());
            break;
          default:
            incorrectInput();
            rl.prompt();
            break;
        }
        rl.prompt();
        break;
      case "hash":
        getHash(currentDir, comandContent, rl);
        break;
      case "compress":
        compress(splitPaths(currentDir, comandContent));
        rl.prompt();
        break;
      case "decompress":
        decompress(splitPaths(currentDir, comandContent));
        rl.prompt();
        break;

      case "exit":
        process.exit(0);
      default:
        incorrectInput();
        rl.prompt();
        break;
    }
  });

  process.on("exit", (code) => {
    console.log(
      `\x1b[35m\nThank you for using File Manager, ${USER}, goodbye!\n\x1b[0m`
    );
  });
};

fm();
