import os from 'os';

export const getOsInfo = function(){
    return JSON.stringify(os.EOL);
}

export const getCpus = function(){
    return os.cpus();
}

export const getHomeDir = function(){
    return os.homedir.toString();
}

export const getUserName = function(){
    return os.userInfo().username;
}

export const getArch = function(){
    return os.arch();
}