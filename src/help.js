const HELP = [
  "List of operations :",
  "'up' - Go upper from current directory,",
  "'cd' - Go to dedicated folder from current directory,",
  "'ls' - Print in console list of all files and folders in current directory,",
  "'cat' - Read file and print it's content in console,",
  "'add' - Create empty file in current working directory,",
  "'rn' - Rename file,",
  "'cp' - Copy file",
  "'mv' - Move file",
  "'rm' - Delete file",
  "'os --EOL' - Get EOL (default system End-Of-Line),",
  "'os --cpus' - Get host machine CPUs info,",
  "'os --homedir' - Get home directory,",
  "'os --username' - Get current system user name,",
  "'os --architecture' - Get CPU architecture for which Node.js binary,",
  "'hash' - Calculate hash for file,",
  "'compress' - Compress file,",
  "'decompress' - Decompress file",
];

const helpPrint = () => {
  HELP.forEach((item) => {
    console.log(`\x1b[35m ${item}\n\x1b[0m`);
  });
};

export { helpPrint };
