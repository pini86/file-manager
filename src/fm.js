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

const readLineInt = readline.createInterface({
  input,
  output,
});

const exitProg = () => {
  console.log(colours.fg.red, "Error, '--username' required!\n", colours.reset);
  process.exit(0);
};

const fm = () => {
  if (process.argv.length < 3) {
    exitProg();
  }

  const USER = process.argv[2].split("--username=")[1];

  if (!USER) {
    exitProg();
  } else {
    console.log(
      colours.fg.magenta,
      `Welcome to the File Manager, ${USER}!\n`,
      colours.reset
    );
    console.log("Type 'help' to see command list.");
  }

  let currentDir = operatingSystem.getHomeDir();

  readLineInt.setPrompt(
    colours.fg.yellow + `You are currently in ${currentDir}\n` + colours.reset
  );
  readLineInt.prompt();

  readLineInt.on("line", async (line) => {
    let [comandName, comandContent] = splitCommand(line);
    switch (comandName) {
      case "help":
        helpPrint();
        readLineInt.prompt();
        break;

      case "up":
        currentDir = up(currentDir);
        readLineInt.setPrompt(
          colours.fg.yellow +
            `You are currently in ${currentDir}\n` +
            colours.reset
        );
        readLineInt.prompt();
        break;

      case "cd":
        currentDir = await cd(currentDir, comandContent);
        readLineInt.setPrompt(
          colours.fg.yellow +
            `You are currently in ${currentDir}\n` +
            colours.reset
        );
        readLineInt.prompt();
        break;

      case "ls":
        await list(currentDir);
        readLineInt.prompt();
        break;

      case "cat":
        await readFile(currentDir, comandContent, readLineInt);
        break;

      case "add":
        await createFile(currentDir, comandContent, readLineInt);
        break;

      case "rn":
        await renameFile(splitPaths(currentDir, comandContent), readLineInt);
        break;

      case "cp":
        await copyFile(splitPaths(currentDir, comandContent), readLineInt);
        break;

      case "mv":
        await moveFile(splitPaths(currentDir, comandContent), readLineInt);
        break;

      case "rm":
        await removeFile(path.resolve(currentDir, comandContent), readLineInt);
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
            readLineInt.prompt();
            break;
        }
        readLineInt.prompt();
        break;
      case "hash":
        await getHash(currentDir, comandContent, readLineInt);
        break;
      case "compress":
        await compress(splitPaths(currentDir, comandContent));
        readLineInt.prompt();
        break;
      case "decompress":
        await decompress(splitPaths(currentDir, comandContent));
        readLineInt.prompt();
        break;

      case ".exit":
        process.exit(0);
      default:
        incorrectInput();
        readLineInt.prompt();
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
