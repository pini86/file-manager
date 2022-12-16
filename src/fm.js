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
import { helpPrint } from "./help.js";
import { compress, decompress } from "./zip.js";
import { colours } from "./colours.js";

const rl = readline.createInterface({
  input,
  output,
});

const fm = () => {
  const USER = process.argv[process.argv.indexOf("--user-name") + 1];
  let currentDir = operatingSystem.getHomeDir();

  if (!process.argv.includes("--user-name") || !USER) {
    console.log(
      colours.fg.red,
      "'--user-name' should be exist!\n",
      colours.reset
    );
    process.exit(0);
  } else {
    console.log(
      colours.fg.magenta,
      `Welcome to the File Manager, ${USER}!\n`,
      colours.reset
    );
    console.log("Type 'help' to see command list.");
  }
  rl.setPrompt(
    colours.fg.yellow + `You are currently in ${currentDir} >\n` + colours.reset
  );
  rl.prompt();

  rl.on("line", async (line) => {
    let [comandName, comandContent] = splitCommand(line);
    switch (comandName) {
      case "help":
        helpPrint();
        rl.prompt();
        break;

      case "up":
        currentDir = up(currentDir);
        rl.setPrompt(
          colours.fg.yellow +
            `You are currently in ${currentDir} >\n` +
            colours.reset
        );
        rl.prompt();
        break;

      case "cd":
        currentDir = await cd(currentDir, comandContent);
        rl.setPrompt(
          colours.fg.yellow +
            `You are currently in ${currentDir} >\n` +
            colours.reset
        );
        rl.prompt();
        break;

      case "ls":
        await list(currentDir);
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
        await getHash(currentDir, comandContent, rl);
        break;
      case "compress":
        await compress(splitPaths(currentDir, comandContent));
        rl.prompt();
        break;
      case "decompress":
        await decompress(splitPaths(currentDir, comandContent));
        rl.prompt();
        break;

      case ".exit":
        process.exit(0);
      default:
        incorrectInput();
        rl.prompt();
        break;
    }
  });

  process.on("exit", (code) => {
    console.log(
      colours.fg.magenta,
      `\nThank you for using File Manager, ${USER}, goodbye!\n`,
      colours.reset
    );
  });
};

fm();
