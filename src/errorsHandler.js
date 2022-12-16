const incorrectInput = () => {
  try {
    throw new Error("\x1b[31mInvalid input!\n\x1b[0m");
  } catch (error) {
    console.log(error.message);
  }
};

const incorrectCommand = (message = "") => {
  try {
    throw new Error(`\x1b[31mOperation failed! ${message}\n\x1b[0m`);
  } catch (error) {
    console.log(error.message);
  }
};

export { incorrectInput, incorrectCommand };
