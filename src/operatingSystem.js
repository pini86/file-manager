import os from "os";

const getOsInfo = function () {
  return JSON.stringify(os.EOL);
};

const getCpus = function () {
  return os.cpus();
};

const getHomeDir = function () {
  return os.homedir();
};

const getUserName = function () {
  return os.userInfo().username;
};

const getArch = function () {
  return os.arch();
};

export { getOsInfo, getCpus, getHomeDir, getUserName, getArch };
