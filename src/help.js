import { colours } from "./colours.js";

const HELP = [
  "List of operations :",
  "'up' - Go upper from current directory.",
  "'cd path_to_directory' - Go to dedicated folder from current directory.",
  "'ls' - Print in console list of all files and folders in current directory.",
  "'cat path_to_file' - Read file and print it's content in console.",
  "'add new_file_name' - Create empty file in current working directory.",
  "'rn path_to_file new_filename' - Rename file.",
  "'cp path_to_file path_to_new_directory' - Copy file.",
  "'mv path_to_file path_to_new_directory' - Move file.",
  "'rm path_to_file' - Delete file.",
  "'os --EOL' - Get EOL (default system End-Of-Line).",
  "'os --cpus' - Get host machine CPUs info.",
  "'os --homedir' - Get home directory.",
  "'os --username' - Get current system user name.",
  "'os --architecture' - Get CPU architecture for which Node.js binary.",
  "'hash path_to_file' - Calculate hash for file.",
  "'compress path_to_file path_to_destination' - Compress file to destination folder, output file has added '.br' extension.",
  "'decompress path_to_file path_to_destination' - Decompress file to destination folder, output file has removed '.br' extension.",
  "'.exit' - Exit from program.",
];

const helpPrint = () => {
  HELP.forEach((item) => {
    console.log(colours.fg.magenta, `${item}\n`, colours.reset);
  });
};

export { helpPrint };
