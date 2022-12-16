import { colours } from "./colours.js";

const incorrectInput = () => {
  try {
    throw new Error(colours.fg.red + "Invalid input!\n" + colours.reset);
  } catch (error) {
    console.log(error.message);
  }
};

const incorrectCommand = (message = "") => {
  try {
    throw new Error(
      colours.fg.red + `Operation failed! ${message}\n` + colours.reset
    );
  } catch (error) {
    console.log(error.message);
  }
};

export { incorrectInput, incorrectCommand };
