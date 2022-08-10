const fs = require("graceful-fs");

const {
  createAFolder,
  makeATextFile,
  getFilesFromAFolder,
  getSortedFilesFromAFolder,
  findTheProperFolder,
  findTheProperFile,
  replaceInAFile,
  sortTheFolders,
  checkIfAFileIncludeAText,
  findAllFilesTillNumber,
  copyFile,
} = require("./textFactory");

const folderPath = "prime-output";
const createAFolderForPrime = (number, folderPathway = folderPath) =>
  createAFolder(".", folderPathway, "output-" + number);

const makeATextFileForPrime = (
  folderNumber,
  fileIndex,
  data,
  folderPathway = folderPath
) =>
  makeATextFile(
    "./" + folderPathway + "/output-" + folderNumber,
    "Output" + fileIndex,
    data
  );

const getSortedFilesFromAFolderForPrime = () =>
  getSortedFilesFromAFolder("./" + folderPath);

const sortFolderForPrime = () => sortTheFolders("./" + folderPath, "output-");

const sortFilesForPrimeInFolder = (foldername) =>
  sortTheFolders("./" + folderPath + "/" + foldername, "Output");

const searchFolderFunc = (folders, num) => {
  return folders.find((f) => {
    let folderNumber = Number(f.split("-")[1]);
    return folderNumber >= num;
  });
};

const findLastFolder = () => {
  let folders = sortTheFolders(folderPath, "output-");
  return folders[folders.length - 1];
};

const findTheProperFolderForPrime = (num) =>
  findTheProperFolder("./" + folderPath, searchFolderFunc, num, "output-");

const searchFileFunc = (folderPath, files, num) => {
  let file = files.find((f) => {
    let data = fs.readFileSync(folderPath + "/" + f, "utf-8");
    data = data.toString();
    data = data.split(", ");
    let firstPrimeInFile = Number(data[0]);
    if (firstPrimeInFile > num) return false;
    let lastPrimeInFile = Number(data[data.length - 2]);
    return firstPrimeInFile <= num && lastPrimeInFile >= num;
  });
  return file;
};

const findTheProperFileForPrime = (num) => {
  return findTheProperFile(
    "./" + folderPath,
    searchFolderFunc,
    searchFileFunc,
    "output-",
    num
  );
};

const searchAllFilesFunc = (folderPath, files, num) => {
  let result = [];
  files.forEach((f) => {
    let data = fs.readFileSync(folderPath + "/" + f, "utf-8");
    data = data.toString();
    data = data.split(", ");
    let firstPrimeInFile = Number(data[0]);
    if (firstPrimeInFile > num) return result;
    if (firstPrimeInFile <= num) result.push(folderPath + "/" + f);
  });
  return result;
};

const findAllFilesForDivision = (num) => {
  return findAllFilesTillNumber(
    "./" + folderPath,
    searchFolderFunc,
    searchAllFilesFunc,
    "output-",
    num
  );
};

const allNumbersInFileArr = (file, folderpath = folderPath) => {
  let data = fs.readFileSync(file, "utf-8");
  data = data.toString();
  data = data.slice(0, -2);
  return data.split(", ");
};

const isPrime = (num) => {
  let file = findTheProperFileForPrime(num);
  if (!file) return false;
  return (
    checkIfAFileIncludeAText(file, `${num}, `) ||
    checkIfAFileIncludeAText(file, `, ${num},`)
  );
};

const copyFiles = (
  files,
  newfolderNum,
  mainFolder = files,
  whichIndex = files.length
) => {
  let filePath =
    mainFolder === files ? "" : "./" + folderPath + "/" + mainFolder + "/";
  for (let i = 0; i < whichIndex; i++) {
    copyFile(
      filePath + files[i],
      "./" +
        folderPath +
        "/output-" +
        newfolderNum +
        "/Output" +
        files[i].split("Output")[1]
    );
  }
};

module.exports = {
  allNumbersInFileArr,
  findAllFilesForDivision,
  findTheProperFileForPrime,
  searchFileFunc,
  findTheProperFolderForPrime,
  searchFolderFunc,
  sortFolderForPrime,
  getSortedFilesFromAFolderForPrime,
  makeATextFileForPrime,
  createAFolderForPrime,
  isPrime,
  findLastFolder,
  copyFiles,
  sortFilesForPrimeInFolder,
  checkIfAFileIncludeAText,
};
