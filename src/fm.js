import { stdin as input, stdout as output } from "process";
import * as readline from "readline";
import path from "path";
import * as operatingSystem from "./operatingSystem.js";
import { splitCommand, splitPaths } from "./utility.js";

const rl = readline.createInterface({
  input,
  output,
});

const fs = () => {
  const USER = process.argv[process.argv.indexOf("--user-name") + 1];
  let currentDir = operatingSystem.getHomeDir();

  if (!process.argv.includes("--user-name")) {
    console.log("'--user-name' shuld be exist");
    process.exit(0);
  } else console.log(`\x1b[35mWelcome to the File Manager, ${USER}!\n\x1b[0m`);
  rl.setPrompt(`\x1b[36mYou are currently in ${currentDir} >\n\x1b[0m`);
  rl.prompt();

  rl.on("line", async (line) => {
    let [comandName, comandContent] = splitCommand(line);
    switch (comandName) {
      case "os":
        switch (comandContent) {
          case "--EOL":
            console.log(operatingSystem.getOsInfo());
            break;
          case "--cpus":
            console.log(operatingSystem.getCpus());
            break;
          case "--homedir":
            console.log(operatingSystem.getHomeDir());
            break;
          case "--username":
            console.log(operatingSystem.getUserName());
            break;
          case "--architecture":
            console.log(operatingSystem.getArchitecture());
            break;
          default:
            throwInvalidInput();
            rl.prompt();
            break;
        }
        rl.prompt();
        break;

      case ".exit":
        process.exit();
      default:
        throwInvalidInput();
        rl.prompt();
        break;
    }
  });

  process.on("exit", (code) => {
    console.log(
      `\x1b[35m\nThank you for using File Manager, ${USER}!\n\x1b[0m`
    );
  });
};

fs();
