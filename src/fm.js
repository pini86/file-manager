import { stdin as input, stdout as output } from "process";
import * as readline from "readline";
import path from "path";
import * as operatingSystem from "./operatingSystem";

const rl = readline.createInterface({
  input,
  output,
});

const fs = () => {
  const USER = process.argv[process.argv.indexOf("--user-name") + 1];
  let currDir = operatingSystem.getHomeDir();

  if (!process.argv.includes("--user-name")) {
    output.write("'--user-name' shuld be exist");
    process.exit(0);
  } else output.write(`\x1b[35mWelcome to the File Manager, ${USER}!\n\x1b[0m`);
  rl.setPrompt(`\x1b[36mYou are currently in ${currentDirectory} >\n\x1b[0m`);
  rl.prompt();
};
