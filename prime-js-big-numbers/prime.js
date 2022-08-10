var outOfthisClass = false;
const fs = require("graceful-fs");

const createAFolder = (number, flag = false) => {
  outOfthisClass = flag;
  if (!outOfthisClass) {
    let rootFolder = "./output";
    if (!fs.existsSync(rootFolder)) {
      fs.mkdirSync(rootFolder, {
        recursive: true,
      });
    }
    dir = `./output/output-${number}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
      return dir;
    }
  } else {
    let rootFolder = "./prime-output-big";
    if (!fs.existsSync(rootFolder)) {
      fs.mkdirSync(rootFolder, {
        recursive: true,
      });
    }

    dir = `./prime-output-big/output-${number}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
      return dir;
    } else {
      throw new Error(
        `\n-----------\n${dir} is existed already!!!\n---------------\n`
      );
    }
  }
};

////////////////////////////////////////////////////////////

// isPrime : to check if a number is prime or not --> result: true/false
// numberDivisions : to have all the divisions

class Prime {
  constructor(num, partitionNumber = 1) {
    this.num = num;
    this.checkingNumber = Math.floor((Math.floor(Math.sqrt(num)) - 5) / 6);
    this.partition = [];
    this.partitionRange = Math.ceil(this.checkingNumber / partitionNumber) + 1;
    this.divisions = [1];
  }

  primePartition = () => {
    let j = 0;
    for (let i = 0; i < this.checkingNumber + 1; i = j * this.partitionRange) {
      this.partition.push(i);
      j++;
    }
  };

  checkForPrime = (check) => {
    if (this.num % check === 0 && this.num !== check) {
      return check;
    } else if (this.num % (check + 2) === 0 && this.num !== check + 2) {
      return check + 2;
    } else {
      return -1;
    }
  };

  isPrime = (number = this.num) => {
    if (number === 2 || number === 3) {
      this.divisions.push(number);
      return true;
    }
    let con1 = number === 1;
    let con2 = number % 2 === 0 && number !== 2;
    let con3 = number % 3 === 0 && number !== 3;
    let conNoPattern7 = (number - 7) % 6 !== 0;
    let conNoPattern5 = (number - 5) % 6 !== 0;
    let conNoPattern = conNoPattern7 && conNoPattern5;

    let con = con1 || con2 || con3 || conNoPattern;
    if (con) {
      if (con2) {
        this.divisions.push(2);
      } else if (con3) {
        this.divisions.push(3);
      }
      return false;
    }

    this.primePartition();
    let division = -1;
    for (let k = 0; k < this.partitionRange; k++) {
      for (let j = 0; j < this.partition.length; j++) {
        let numberToCheck = 6 * (k + this.partition[j]) + 5;
        division = this.checkForPrime(numberToCheck);
        if (division !== -1) {
          this.divisions.push(division);
          return false;
        }
      }
    }

    this.divisions.push(number);
    return true;
  };

  textForIsPrimeFunction = (isPrime) => {
    return isPrime
      ? `${this.num} is a prime number.`
      : `${this.num} is not a prime number.`;
  };

  numberDivisions = () => {
    this.divisions = [1];

    while (this.num > 1) {
      let isPrime = this.isPrime();
      // console.log(this.textForIsPrimeFunction(isPrime)+'\n');
      const lastDivisior = this.divisions[this.divisions.length - 1];
      console.log(
        "\nnumber: " +
          this.num +
          " | isprime --> " +
          isPrime +
          " | divided by: " +
          lastDivisior +
          "\n"
      );

      if (this.num % lastDivisior === 0 && this.num !== lastDivisior) {
        this.num /= lastDivisior;
        this.checkingNumber = Math.floor(
          (Math.floor(Math.sqrt(this.num)) - 5) / 6
        );
        this.partition = [];
        this.partitionRange = this.checkingNumber + 1;
      } else {
        this.num = 1;
      }
    }
    return this.divisions.sort((a, b) => a - b);
  };

  makeATextFile = (foldername, pageIndex, data) => {
    fs.appendFileSync(`${foldername}/Output${pageIndex}.txt`, data, (err) => {
      if (err) throw "appending error: " + err;
    });
  };

  makeATextOfAllPrimes = (foldername, data) => {
    fs.appendFileSync(`${foldername}/all.txt`, data, (err) => {
      if (err) throw "appending error: " + err;
    });
  };
}

// let pr = new Prime(99999954547757, 1);
// console.log(pr.isPrime());
// console.log(pr.numberDivisions());
////////////////////////////////////////////////////////////

// To find out the different type of prime ( SophiePrime, MersennePrime, ...)
class PrimeType {
  constructor(num, partition) {
    this.number = num;
    this.partition = partition;
  }

  isPrimeChecking = (
    number = this.number,
    partitionNumber = this.partition
  ) => {
    if (number === 2 || number === 3) {
      return true;
    }

    let con1 = number === 1;
    let con2 = number % 2 === 0 && number !== 2;
    let con3 = number % 3 === 0 && number !== 3;
    let conNoPattern7 = (number - 7) % 6 !== 0;
    let conNoPattern5 = (number - 5) % 6 !== 0;
    let conNoPattern = conNoPattern7 && conNoPattern5;
    let con = con1 || con2 || con3 || conNoPattern;

    if (con) {
      return false;
    }

    let j = 0;
    let checkingNumber = Math.floor((Math.floor(Math.sqrt(number)) - 5) / 6);
    let partitionRange = Math.ceil(checkingNumber / partitionNumber) + 1;
    let partition = [];
    for (let i = 0; i < checkingNumber + 1; i = j * partitionRange) {
      partition.push(i);
      j++;
    }
    for (let k = 0; k < partitionRange; k++) {
      for (let j = 0; j < partition.length; j++) {
        let numberToCheck = 6 * (k + partition[j]) + 5;
        if (
          (number % numberToCheck === 0 && number !== numberToCheck) ||
          (number % (numberToCheck + 2) === 0 && number !== numberToCheck + 2)
        ) {
          return false;
        }
      }
    }
    return true;
  };

  isSophiePrime = () => {
    const isPrime = this.isPrimeChecking();

    if (isPrime) {
      const sophiePrime = this.isPrimeChecking(2 * this.number + 1);

      if (sophiePrime) {
        return `${this.number} is a Sophie prime`;
      }
    } else {
      return `${this.number} is not a prime number.`;
    }

    return `${this.number} is not a Sophie prime`;
  };

  isMersennePrime = () => {
    let numberSize = Math.ceil(Math.log10(2 ** number - 1));
    if (numberSize > 17) {
      return `The size of the number (${numberSize}) is bigger than 17 and can not find if it is mersenne or not.`;
    }
    const isPrime = this.isPrimeChecking();

    if (isPrime) {
      const mersennePrime = 2 ** this.number - 1;
      const isMersenne = this.isPrimeChecking(mersennePrime);
      if (isMersenne) {
        return `${this.number} is a Mersenne prime`;
      }
    } else {
      return `${this.number} is not a prime number.`;
    }

    return `${this.number} is not a Mersenne number`;
  };

  isTwinPrime = () => {
    let str = "";

    const isPrime = this.isPrimeChecking();
    if (isPrime) {
      let twinFirst = this.number - 2;
      let twinSecond = this.number + 2;

      const isTwinFirst = this.isPrimeChecking(twinFirst);
      const isTwinSecond = this.isPrimeChecking(twinSecond);

      if (isTwinFirst) {
        str += `${this.number} & ${twinFirst} : Twins\n`;
      }

      if (isTwinSecond) {
        str += `${this.number} & ${twinSecond} : Twins\n`;
      }
    } else {
      return `${this.number} is not a prime number.`;
    }

    return str ? str : `No Twins`;
  };

  isIsolatedPrime = () => {
    const isPrime = this.isPrimeChecking();

    if (isPrime) {
      let isolatedFirst = this.number + 2;
      let isolatedSecond = this.number - 2;

      const isIsolatedFirst = this.isPrimeChecking(isolatedFirst);
      const isIsolatedSecond = this.isPrimeChecking(isolatedSecond);

      if (!isIsolatedFirst && !isIsolatedSecond) {
        return `${this.number} is an isolated prime`;
      }
      return `${this.number} is prime, but not an isolated one.`;
    }

    return `${this.number} is not a prime number.`;
  };
}

// let number = 900719925481
// let partition = 1;
// let prCheck = new PrimeType(number, partition);
// console.log(prCheck.isPrimeChecking());
// console.log(prCheck.isIsolatedPrime());
// console.log(prCheck.isTwinPrime());
// // console.log(prCheck.isMersennePrime());
// console.log(prCheck.isSophiePrime())

////////////////////////////////////////////////////////////

// primeToANumber : to make a txt file output that contain all the prime numbers to a specific number
// ---------------- point: the output will be in output folder
// ---------------- point: every 9000 prime numbers will be in a txt file

// primeRange : count how many prime numbers are in (num1 , num2) range
// ------------ point: after running this command, we can find the primes on primeInARange array
class PrimeInRange {
  constructor(number, partition = 1, outOfthisClassFlag = false) {
    this.number = number;
    this.partition = partition;
    this.primeInARange = [];
    this.outOfthisClassFlag = outOfthisClassFlag;
  }
  primeFromANumber = (foldername, startPrime = 1, count = 0, lastData = "") => {
    let startTime = Date.now();
    let len = this.number + 1;
    let isStringClass = foldername.includes("prime-output-big");
    let flag = true;
    let fileNumber;
    if (!lastData.includes("all")) {
      fileNumber = lastData.split("Output")[1];
      fileNumber = fileNumber.split(".txt")[0];
    }

    for (let i = +startPrime + 1; i < len; i++) {
      let checkPr = new Prime(i, this.partition);
      let isPrime = checkPr.isPrime(i);

      if (isPrime) {
        if (isStringClass) {
          checkPr.makeATextOfAllPrimes(foldername, `,${i}`);
        } else {
          if (count % 9000 === 0 || !flag) {
            if (count % 9000 === 0) {
              fileNumber = +fileNumber + 1;
              flag = false;
            }
            checkPr.makeATextFile(
              foldername,
              fileNumber,
              count % 20 === 0 ? `\n(${count}) | ${i},` : `${i},`
            );
          } else if (flag) {
            let data = fs.readFileSync(foldername + "/" + lastData, "utf-8");
            data = data.toString();
            data += `${i},`;
            fs.writeFileSync(foldername + "/" + lastData, data);
            flag = false;
          }
        }

        count++;
      }
      if (i === this.number && !isStringClass) {
        checkPr.makeATextFile(foldername, fileNumber, `\n(${count})`);
      }
    }

    let finishTime = Date.now();
    console.log(
      `time to finish the job: ${(finishTime - startTime) / 1000} seconds `
    );
    return count;
  };

  primeToANumber = () => {
    let startTime = Date.now();
    let pageIndex = 0;
    let foldername = createAFolder(this.number, this.outOfthisClassFlag);
    let isStringClass = foldername.includes("prime-output-big");

    let count = 0;
    for (let i = 2; i < this.number + 1; i++) {
      let checkPr = new Prime(i, this.partition);
      let isPrime = checkPr.isPrime(i);
      if (isPrime) {
        if (count % 9000 === 0 && count !== 0) {
          pageIndex++;
        }
        isStringClass
          ? checkPr.makeATextOfAllPrimes(foldername, i + ",")
          : checkPr.makeATextFile(
              foldername,
              pageIndex,
              count % 20 === 0 ? `\n(${count}) | ${i},` : `${i},`
            );
        count++;
      }
      if (i === this.number && !isStringClass) {
        checkPr.makeATextFile(foldername, pageIndex, `\n(${count})`);
      }
    }
    let finishTime = Date.now();
    console.log(
      `time to finish the job: ${(finishTime - startTime) / 1000} seconds `
    );
    return count;
  };

  primeRange = (firstNumber, secondNumber) => {
    let count = 0;
    for (let i = firstNumber; i < secondNumber + 1; i++) {
      let checkPr = new PrimeType(i, this.partition);
      let isPrime = checkPr.isPrimeChecking(i);
      if (isPrime) {
        this.primeInARange.push(i);
        count++;
      }
    }
    return count;
  };
}

// let n = 21443555;
// let p = 1;
// let prCheck = new PrimeInRange(n, p);
// prCheck.primeToANumber();

// let counted = 0;
// for (let i=1; i<100; i = i + 100 ){
//   console.log(`Range: ( ${i} , ${i+100} )`);
//   counted += prCheck.primeRange(i,i+100)
//   console.log(prCheck.primeRange(i,i+100));
//   console.log('----')
// }
// console.log(prCheck.primeInARange);
// console.log('counted:', counted)

// let num1 = 887138439704
// let num2 = 887138445378
// let prCheck = new PrimeInRange(1,1)
// console.log(prCheck.primeRange(num1, num2));
// console.log(prCheck.primeInARange);

////////////////////////////////////////////////////////////

// getAllFromDir : to get all things inside a directory
// findTheProperFolder : in output folder, we will have some saved files. The --
// -- files name have a number, that tel us this folder contains files up to a specific number ---
// -- To check if a number is prime or not, we can find the proper folder.
// findTheProperFile : in each saved folder inside the output folder, we can check what is --
// -- the first and last prime numbers. and it will find the proper file that we need to check.
// checkIsPrime : this will check if a number is prime or not. this will check if it is prime, using the logic in PrimeInRange class
// isPrime : this will check if a number is prime or not. If it is not a prime, will give the divisions.

class SearchForPrime {
  constructor(num) {
    this.source = "./output";
    this.outputs = [];
    this.folderToSearch = "./output/";
    this.fileToSearch = "";
    this.number = num;
    this.firstPrime = 0;
    this.lastPrime = 0;
  }

  getAllFromDir = (source) => fs.readdirSync(source);

  findTheProperFolder = () => {
    this.outputs = this.getAllFromDir(this.source);
    this.outputs.sort((a, b) => {
      return parseInt(a.split("output-")[1]) - parseInt(b.split("output-")[1]);
    });
    let result = this.outputs.find((output) => {
      let folderNumber = Number(output.split("-")[1]);
      return folderNumber >= this.number;
    });

    if (result) {
      this.folderToSearch += result;
      return;
    } else {
      return `\n${this.number} is bigger than what we have in outputs.\nUse isPrime method`;
    }
  };

  findTheProperFile = () => {
    this.folderToSearch = "./output/";
    this.fileToSearch = "";
    let result = this.findTheProperFolder();

    if (!result) {
      const files = this.getAllFromDir(this.folderToSearch);
      files.sort((a, b) => {
        return parseInt(a.split("Output")[1]) - parseInt(b.split("Output")[1]);
      });
      this.fileToSearch = this.folderToSearch + "/";
      let fileResult = files.find((file) => {
        let data = fs.readFileSync(this.folderToSearch + "/" + file, "utf-8");
        data = data.toString();
        data = data.split("|");

        let firstPrime = Number(data[1].split(",")[0]);
        let lastString = data[data.length - 1].split(",");
        let lastPrime = Number(lastString[lastString.length - 2]);
        let condition = firstPrime <= this.number && lastPrime >= this.number;
        return condition;
      });

      return fileResult
        ? (() => {
            this.fileToSearch += fileResult;
            return;
          })()
        : 1;
    } else {
      return result;
    }
  };

  checkIsPrime = () => {
    let detective;
    let result = this.findTheProperFile();

    if (result === 1) {
      return 1;
    }
    if (!result) {
      const FILE_LOCATION = this.fileToSearch;

      let data = fs.readFileSync(FILE_LOCATION, "utf-8");

      data = data.toString();
      while (data.includes("|")) {
        data = data.replace(/\n.*\| /, "");
      }
      data = data.split(",");
      detective = data.indexOf("" + this.number) > -1 ? -1 : 1;
    } else {
      let prCheck = new PrimeInRange(this.number, 10000);
      let count = prCheck.primeRange(this.number, this.number);
      detective = count ? -1 : 1;
    }
    return detective;
  };

  isPrime = () => {
    let detective = this.checkIsPrime();
    console.log(`Is ${this.number} a prime number?`);

    if (detective === -1) {
      return `\n------\n${this.number} is a prime number.\n------\n`;
    } else {
      let prChecking = new Prime(this.number, 10000);
      let divisions = prChecking.numberDivisions();
      divisions = divisions.join(",");
      return `\n------\n${this.number} is not a prime number.\n\nIt has these divisors: ${divisions}\n------\n`;
    }
  };
}

// let primeSearch = new SearchForPrime(9001484328764643);
// console.log(primeSearch.findTheProperFolder());
// console.log(primeSearch.folderToSearch)
// console.log(primeSearch.findTheProperFile())
// console.log(primeSearch.fileToSearch)

// console.log(primeSearch.isPrime());
// console.log(primeSearch.folderToSearch);
// console.log(primeSearch.fileToSearch)

////////////////////////////////////////////////////////

// This class will check for prime according to the if they are dividable by primes before this number. --
// -- Then this will just go through the text files.

class PrimeFromText {
  constructor() {
    this.folderToSearch = "";
    this.divisions = [1];
  }

  findfolderToSearchIn = (num) => {
    let checkingNumber = Math.floor(Math.sqrt(num));
    let prSearch = new SearchForPrime(checkingNumber);
    let whichFolderToSearch = prSearch.findTheProperFolder();
    if (!whichFolderToSearch) {
      this.folderToSearch = prSearch.folderToSearch;
    }
  };

  getAllFromDir = (source) => fs.readdirSync(source);

  primesInAText = (file) => {
    let data = fs.readFileSync(file, "utf-8");

    data = data.toString();
    while (data.includes("|")) {
      data = data.replace(/\n.*\| /, "");
    }
    data = data.split(",");
    return data;
  };

  checkIfANumberIsDividedByAPrimeInAText = (num, data) => {
    for (let i = 0; i < data.length; i++) {
      if (!data[i].includes("(") && num % data[i] === 0) {
        return data[i];
      }
    }
    return -1;
  };

  checkDivisionsFromAFile = (num) => {
    this.findfolderToSearchIn(num);
    let result = this.folderToSearch || "./output/output-578453251";
    let res = this.getAllFromDir(result);

    let divisior = -1;
    for (let i = 0; i < res.length; i++) {
      let data = this.primesInAText(result + "/" + res[i]);
      divisior = this.checkIfANumberIsDividedByAPrimeInAText(num, data);
      if (divisior !== -1) {
        this.divisions.unshift(+divisior);
        break;
      }
    }
    console.log(`info -> num : ${num} | divisor -> ${divisior}\n---\n`);
    if (this.divisions[0] !== 1 && divisior !== -1) {
      // if (num === this.divisions[0]) {this.divisions.unshift(num)};
      return this.checkDivisionsFromAFile(num / this.divisions[0]);
    } else {
      if (num !== 1) {
        this.divisions.unshift(num);
      }
      return this.divisions;
    }
  };

  isPrime = (num) => {
    console.log(
      "**Becuase of Js limitation, this works up to number: 9007199254740991\n"
    );
    this.divisions = [1];
    this.checkDivisionsFromAFile(num);
    if (this.divisions.length < 3) {
      return `${num} is a prime number.`;
    } else {
      let scientificWay = this.scientificWayForWritingDivisors(this.divisions);
      return `${num} is not a prime number.\n\nDivisiors = ${this.divisions}\n\nScientific way = ${scientificWay}\n`;
    }
  };

  scientificWayForWritingDivisors = (divisionsArray) => {
    let res = {};
    divisionsArray.forEach((d) => {
      if (res[d]) {
        res[d]++;
      } else {
        res[d] = 1;
      }
    });

    let string = "";
    for (let key in res) {
      string += `${key}**${res[key]} * `;
    }
    return string.slice(0, string.length - 2);
  };
}

// let number = 3000494776254881
// let prSearch = new PrimeFromText();

// console.log(prSearch.isPrime(number));

/////////////////////////////////////////////////////
const makeATextFile = (foldername, filename, data) => {
  fs.appendFileSync(`${foldername}/${filename}`, data, (err) => {
    if (err) throw "appending error: " + err;
  });
};

class PrimeWriter {
  constructor(outOfthisClassFlag = false) {
    this.outOfthisClassFlag = outOfthisClassFlag;
  }

  copyFromText = (folder, folderNumber, num, getDirsFunc, getFileFunc) => {
    if (folderNumber === num) {
      return `Output for ${num} already exists.`;
    } else {
      let dir = createAFolder(num, this.outOfthisClassFlag);
      let isStringClass = dir.includes("prime-output-big");
      if (isStringClass) {
        return -1;
      }

      let data = getDirsFunc(folder);
      data.sort((a, b) => {
        return parseInt(a.split("Output")[1]) - parseInt(b.split("Output")[1]);
      });

      let fileIndex = data.indexOf(getFileFunc.split(folder + "/")[1]);

      for (let i = 0; i < fileIndex; i++) {
        let dataInAFile = fs.readFileSync(folder + "/" + data[i], "utf-8");
        dataInAFile = dataInAFile.toString();
        makeATextFile(dir, data[i], dataInAFile);
      }
      let lastData = fs.readFileSync(getFileFunc, "utf-8");
      lastData = lastData.toString();
      while (lastData.includes("|")) {
        lastData = lastData.replace(/\n.*\| /, "");
      }
      lastData = lastData.split(",");
      let count = fileIndex * 9000;
      for (let i = 0; i < lastData.length; i++) {
        if (Math.max(lastData[i], num) === num || lastData[i] === num) {
          makeATextFile(
            dir,
            data[fileIndex],
            count % 20 === 0
              ? `\n(${count}) | ${lastData[i]},`
              : `${lastData[i]},`
          );
          count++;
        } else {
          break;
        }
      }
      makeATextFile(dir, data[fileIndex], `\n(${count})`);
    }
  };

  copyAll = (getAllDirFunc, num) => {
    let source = "./output";
    let outputs = getAllDirFunc(source);
    let outputTarget;
    let maxLength = 0;
    for (let i = 0; i < outputs.length; i++) {
      if (
        outputs[i].length > maxLength ||
        (outputs[i].length === maxLength && outputs[i] > outputTarget)
      ) {
        maxLength = outputs[i].length;
        outputTarget = outputs[i];
      }
    }
    let folder = source + "/" + outputTarget;
    let data = getAllDirFunc(folder);
    if (data.length > 1) {
      data.sort((a, b) => {
        return parseInt(a.split("Output")[1]) - parseInt(b.split("Output")[1]);
      });
    }

    let dir = createAFolder(num, this.outOfthisClassFlag);
    let folderSplit = outputTarget.split("output/");
    let lastPrime = folderSplit[folderSplit.length - 1];

    let datas = getAllDirFunc(source + "/" + outputTarget);

    let lastOutputLength = 0;
    let lastOutput = "";
    datas.forEach((output) => {
      if (
        output.length > lastOutputLength ||
        (output.length === lastOutputLength && output > lastOutput)
      ) {
        lastOutputLength = output.length;
        lastOutput = output;
      }
    });

    let lastData = fs.readFileSync(
      source + "/" + outputTarget + "/" + lastOutput,
      "utf-8"
    );
    lastData = lastData.toString();
    let lastIndex = lastData.lastIndexOf("\n");
    let lastDataToCopy = lastData.slice(0, lastIndex);
    lastData = lastData.split("(");
    lastData = lastData[lastData.length - 1];
    lastData = lastData.split(")")[0];

    for (let i = 0; i < data.length; i++) {
      let dataInAFile = fs.readFileSync(folder + "/" + data[i], "utf-8");
      dataInAFile = dataInAFile.toString();
      if (i === data.length - 1) {
        dataInAFile = lastDataToCopy;
      }
      makeATextFile(dir, data[i], dataInAFile);
    }
    let firstNumberPrimeRange = outputTarget.split("output-")[1];

    return [
      lastPrime,
      dir,
      data[data.length - 1],
      lastData,
      firstNumberPrimeRange,
    ];
  };

  folderNumber = (folder, splitPattern) => {
    let folderSplit = folder.split(splitPattern);
    let folderNumber = folderSplit[folderSplit.length - 1];
    return folderNumber;
  };

  primeToANumberFromText = (num) => {
    let t1 = Date.now();
    let pr = new SearchForPrime(num);
    pr.findTheProperFile();
    let folder = pr.folderToSearch;

    let folderNumber = this.folderNumber(folder, "output/");

    if (folderNumber) {
      let res = this.copyFromText(
        folder,
        folderNumber,
        num,
        pr.getAllFromDir,
        pr.fileToSearch
      );
      if (res === -1) {
        return;
      }
    } else {
      let result = this.copyAll(pr.getAllFromDir, num);
      let prime = new PrimeInRange(num, 100);
      let folder = result[0];
      let folderNumber = this.folderNumber(folder, "output-");
      prime.startPrime = folderNumber;
      // [lastPrime, dir, data.length-1,lastData, firstNumberPrimeRange]
      prime.primeFromANumber(result[1], result[4], +result[3], result[2]);
    }
    let t2 = Date.now();
    console.log("All jobs done in " + (t2 - t1) / 1000 + " seconds.");
  };
}

// let num = 579254881;
// let pr = new PrimeWriter();
// pr.primeToANumberFromText(num)

module.exports = {
  Prime,
  PrimeFromText,
  PrimeInRange,
  PrimeType,
  SearchForPrime,
};
