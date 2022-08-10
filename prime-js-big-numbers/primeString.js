// This module will use mathOperation class to do the math operation on big numbers --
// that js can not deal with.

const MathOperation = require("./mathOperation");
let operation = new MathOperation();

const primeNumberModule = require("./prime");

const fs = require("fs");
const createAFolder = (number) => {
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
  } else {
    console.log(
      `Error:\n-----------\n${dir} is existed already!!!\n---------------\n`
    );
  }
  return dir;
};

////////////////////////////////////////////////////////////

class Prime {
  constructor(num, partitionNumber = 1) {
    this.num = num + "";
    this.checkingNumber =
      this.num < 10
        ? this.num
        : operation.add(
            operation.division(
              operation.subtract(
                operation.add(operation.division(num, "2")[0], "1"),
                "5"
              ),
              "6"
            )[0],
            "1"
          );
    this.partition = [];
    this.partitionRange = +operation.add(
      operation.add(
        operation.division(this.checkingNumber + "", partitionNumber + "")[0],
        "1"
      ),
      "1"
    );
    this.divisions = ["1"];
  }

  isPrimePartition = () => {
    let j = 0;
    if (this.partitionRange === "0") {
      this.partitionRange = "1";
    }
    for (let i = 0; i < +this.checkingNumber + 1; i = j * this.partitionRange) {
      this.partition.push(i);
      j++;
    }
  };

  checkForPrime = (check) => {
    if (operation.min(this.num, "9007199254740991") === this.num) {
      let prr = new primeNumberModule.Prime(+this.num);

      return prr.checkForPrime(+check);
    }

    let con1 = operation.division(this.num, check + "")[1] === "0";
    let con2 = this.num !== check;
    let secondNumber = operation.add(check, "2");
    let con3 = operation.division(this.num, secondNumber)[1] === "0";
    let con4 = this.num !== secondNumber;
    if (con1 && con2) {
      return check;
    } else if (con3 && con4) {
      return secondNumber;
    } else {
      return -1;
    }
  };

  isPrime = (number = this.num) => {
    if (operation.min(this.num, "9007199254740991") === this.num) {
      let prr = new primeNumberModule.Prime(+this.num);
      return prr.isPrime();
    }

    if (number === "2" || number === "3") {
      this.divisions.push(number);
      return true;
    }

    let con1 = number === "1";
    let con2 = operation.dividedBy2(number);
    let con3 = operation.dividedBy3(number);
    let conNoPattern7 = !operation.dividedBy6(
      operation.subtract(number + "", "7")
    );
    let conNoPattern5 = !operation.dividedBy6(
      operation.subtract(number + "", "5")
    );
    let conNoPattern = conNoPattern7 && conNoPattern5;

    let con = con1 || con2 || con3 || conNoPattern;
    if (con) {
      if (con2) {
        this.divisions.push("2");
      } else if (con3) {
        this.divisions.push("3");
      }
      return false;
    }

    this.isPrimePartition();

    let division = -1;
    for (let k = 0; k < this.partitionRange; k++) {
      for (let j = 0; j < this.partition.length; j++) {
        let numberToCheck = operation.add(
          operation.cross("6", k + this.partition[j] + ""),
          "5"
        );

        division = this.checkForPrime(numberToCheck);
        if (division !== -1) {
          this.divisions.push(division);
          return false;
        }
      }
    }
    this.divisions.push(number + "");
    return true;
  };

  textForIsPrimeFunction = (isPrime) => {
    return isPrime
      ? `${this.num} is a prime number.`
      : `${this.num} is not a prime number.`;
  };

  numberDivisions = () => {
    this.divisions = ["1"];
    while (+this.num > 1) {
      if (operation.min(this.num, "9007199254740991") === this.num) {
        let prr = new primeNumberModule.Prime(+this.num, 1);
        this.divisions = [...this.divisions, ...prr.numberDivisions()];
        this.divisions.sort((a, b) => a - b);
        this.divisions.shift();
        return this.divisions;
      } else {
        let isPrime = this.isPrime();

        // console.log(this.textForIsPrimeFunction(isPrime)+'\n');
        const lastDivisior = this.divisions[this.divisions.length - 1];
        console.log(
          "\nnumber: " +
            this.num +
            " | isprime --> " +
            isPrime +
            " | last divisior: " +
            lastDivisior +
            "\n"
        );

        let division = operation.division(this.num, lastDivisior);
        if (division[1] === "0" && this.num !== lastDivisior) {
          this.num = division[0];
          if (
            !operation
              .subtract(
                operation.add(operation.division(this.num, "2")[0], "1"),
                "5"
              )
              .includes("-")
          ) {
            this.checkingNumber = operation.add(
              operation.division(
                operation.subtract(
                  operation.add(operation.division(this.num, "2")[0], "1"),
                  "5"
                ),
                "6"
              )[0],
              "1"
            );
            this.partition = [];
            this.partitionRange = +operation.add(this.checkingNumber, "1");
          } else {
            this.divisions.push(this.num);
            this.num = "1";
          }
        } else {
          this.num = "1";
        }
      }
    }
    // console.log('------\n------');
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

// let res = operation.cross("13234243252", "12435463277543");
// let res = "10";
// let pr = new Prime(res, 1);
// console.log(pr.isPrimePartition())
// console.log(pr.partition)
// console.log(pr.partitionRange)
// console.log(pr.isPrime());
// console.log('res:', res);
// console.log(pr.numberDivisions());

////////////////////////////////////////////////////////////

class PrimeType {
  constructor(num, partition = 1) {
    this.number = num;
    this.partition = partition + "";
  }
  isPrimeChecking = (
    number = this.number,
    partitionNumber = this.partition
  ) => {
    if (operation.min(this.number, "9007199254740991") === this.number) {
      return new primeNumberModule.PrimeType(+this.number, 1).isPrimeChecking();
    }
    if (number === "2" || number === "3") {
      return true;
    }

    let con1 = number === "1";
    let con2 = operation.dividedBy2(number + "");
    let con3 = operation.dividedBy3(number + "");
    let conNoPattern7 = !operation.dividedBy6(
      operation.subtract(number + "", "7")
    );
    let conNoPattern5 = !operation.dividedBy6(
      operation.subtract(number + "", "5")
    );

    let conNoPattern = conNoPattern7 && conNoPattern5;
    let con = con1 || con2 || con3 || conNoPattern;

    if (con) {
      return false;
    }

    let checkingNumber = operation.add(
      operation.division(
        operation.subtract(
          operation.add(operation.division(number, "2")[0], "1"),
          "5"
        ),
        "6"
      )[0],
      "1"
    );
    let partitionRange = operation.add(
      operation.division(checkingNumber, partitionNumber + "")[1],
      "2"
    );

    let partition = [];
    let i = "0";
    let j = "0";

    while (operation.min(i, checkingNumber) === i) {
      partition.push(i);
      i = operation.cross(j, partitionRange);
      j = operation.add(j, "1");
      console.log("i:", i, " | j:", j, " | checkingNumber:", checkingNumber);
    }

    for (let k = 0; k < +partitionRange; k++) {
      for (let j = 0; j < partition.length; j++) {
        let numberToCheck = operation.add(
          "5",
          operation.cross("6", operation.add(k + "", partition[j] + ""))
        );
        let con1 = operation.division(number + "", numberToCheck)[1] === "0";
        let con2 = number !== numberToCheck;
        let con3 =
          operation.division(number, operation.add(numberToCheck, "2"))[1] ===
          "0";
        let con4 = number !== operation.add(numberToCheck, "2");
        let con = (con1 && con2) || (con3 && con4);
        if (con) {
          return false;
        }
      }
    }
    return true;
  };

  isSophiePrime = () => {
    const isPrime = this.isPrimeChecking();

    if (isPrime) {
      let chekingSophie = operation.add(
        "1",
        operation.cross("2", this.number + "")
      );
      const sophiePrime = this.isPrimeChecking(chekingSophie);

      if (sophiePrime) {
        return `${this.number} is a Sophie prime`;
      }
    } else {
      return `${this.number} is not a prime.`;
    }

    return `${this.number} is not a Sophie prime`;
  };

  // isMersennePrime = () => {
  //   let numberSize = Math.ceil(Math.log10(2**number-1));
  //   if (numberSize > 17){
  //     return `The size of the number (${numberSize}) is bigger than 17 and can not find if it is mersenne or not.`
  //   }
  //   const isPrime = this.isPrimeChecking()

  //   if (isPrime){
  //     const mersennePrime = 2**this.number - 1;
  //     const isMersenne = this.isPrimeChecking(mersennePrime);
  //     if (isMersenne) {
  //       return `${this.number} is a Mersenne prime`;
  //     }
  //   }

  //   return `${this.number} is not a Mersenne number`;

  // }

  isTwinPrime = () => {
    let str = "";

    const isPrime = this.isPrimeChecking();
    if (isPrime) {
      let twinFirst = operation.subtract(this.number, "2");
      let twinSecond = operation.add(this.number, "2");

      const isTwinFirst = this.isPrimeChecking(twinFirst);
      const isTwinSecond = this.isPrimeChecking(twinSecond);

      if (isTwinFirst) {
        str += `${this.number} & ${twinFirst} : Twins\n`;
      }

      if (isTwinSecond) {
        str += `${this.number} & ${twinSecond} : Twins\n`;
      }
    } else {
      return `${this.number} is not a prime.`;
    }

    return str ? str : `No Twins`;
  };

  isIsolatedPrime = () => {
    const isPrime = this.isPrimeChecking();

    if (isPrime) {
      let isolatedFirst = operation.add(this.number, "2");
      let isolatedSecond = operation.subtract(this.number, "2");

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

// let number = '37';
// let prr = new PrimeType(number, 1);
// // console.log(prr.isTwinPrime());
// console.log(prr.isPrimeChecking());
// console.log(prr.isIsolatedPrime());
////////////////////////////////////////

class PrimeInRange {
  constructor(number, partition = 1) {
    this.number = number;
    this.partition = partition;
    this.primeInARange = [];
    this.startPrime = 2;
  }

  primeToANumber = () => {
    if (operation.min(this.number, "9007199254740991") === this.number) {
      return new primeNumberModule.PrimeInRange(
        +this.number,
        1,
        true
      ).primeToANumber();
    }

    let startTime = Date.now();

    let foldername = createAFolder(this.number);
    let len = operation.add(this.number, "1");
    let count = 0;
    let i = "2";
    while (operation.min(i, len) === i) {
      let checkPr, isPrime;
      if (operation.min(i, "9007199254740991") === i) {
        checkPr = new primeNumberModule.Prime(+i, +this.partition);
        isPrime = checkPr.isPrime(+i);
      } else {
        checkPr = new Prime(i + "", this.partition);
        isPrime = checkPr.isPrime("" + i);
      }

      if (isPrime) {
        checkPr.makeATextOfAllPrimes(foldername, `${i},`);
        count++;
      }
      i = operation.add(i + "", "1");
      let resi = operation.division(i, "6")[1];
      while (resi !== "5" && resi !== "1" && i !== "3") {
        i = operation.add(i, "1");
        resi = operation.division(i, "6")[1];
      }
    }
    let finishTime = Date.now();
    console.log(
      `time to finish the job: ${(finishTime - startTime) / 1000} seconds `
    );
    return count;
  };

  primeFromANumber = (foldername, startPrime = 1, count = 0, lastData) => {
    // if (operation.min(this.number , '9007199254740991') === this.number) { return new primeNumberModule.PrimeInRange(+this.number,1).primeFromANumber(foldername,startPrime,count, lastData);}

    let startTime = Date.now();
    let len = operation.add(this.number, "1");

    for (let i = this.startPrime; i < +len; i++) {
      let checkPr = new Prime(i + "", this.partition);
      let isPrime = checkPr.isPrime("" + i);
      if (isPrime) {
        checkPr.makeATextOfAllPrimes(foldername, `,${i}`);
        count++;
      }
      if (i === +len - 1) {
        checkPr.makeATextOfAllPrimes(foldername, `,`);
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
    if (operation.min(secondNumber, "9007199254740991") === secondNumber) {
      let prCheck = new primeNumberModule.PrimeInRange(1, 1);
      count = prCheck.primeRange(+firstNumber, +secondNumber);
      this.primeInARange = [...prCheck.primeInARange];
      return count;
    }

    if (
      operation.min(secondNumber, "9007199254740991") === "9007199254740991" &&
      operation.min(firstNumber, "9007199254740991") === firstNumber
    ) {
      let prCheck = new primeNumberModule.PrimeInRange(5, 1);
      count = prCheck.primeRange(firstNumber, 9007199254740991);
      let primesFirstPart = prCheck.primeInARange;
      this.primeInARange = [...primesFirstPart];
      firstNumber = "9007199254740991";
    }

    let i = firstNumber + "";
    let checkPr, isPrime;
    while (operation.min(secondNumber + "", i + "") === i + "") {
      checkPr = new Prime(i + "", this.partition);
      isPrime = checkPr.isPrime("" + i);

      if (isPrime) {
        this.primeInARange.push(i);
        count++;
      }

      i = operation.add(i + "", "1");
      let resi = operation.division(i, "6")[1];
      while (resi !== "5" && resi !== "1" && i !== "3") {
        i = operation.add(i, "1");
        resi = operation.division(i, "6")[1];
      }
    }

    return count;
  };
}

// let number = "10000000";
// console.log(number);
// let pr = new PrimeInRange(number, "1");
// console.log(pr.primeToANumber());

// let num1 = '687572462243'
// let num2 = '687572467303'
// let pr = new PrimeInRange('1','1');
// console.log(pr.primeRange(num1,num2));
// console.log(pr.primeInARange);

///////////////////////

class SearchForPrime {
  constructor(num) {
    this.source = "./prime-output-big";
    this.outputs = [];
    this.folderToSearch = "./prime-output-big/";
    this.fileToSearch = "";
    this.number = num;
    this.firstPrime = 0;
    this.lastPrime = 0;
  }

  getAllFromDir = (source) => fs.readdirSync(source);

  findTheProperFolder = () => {
    this.folderToSearch = "./prime-output-big/";
    this.outputs = this.getAllFromDir(this.source);
    this.outputs.sort((a, b) => {
      return parseInt(a.split("Output")[1]) - parseInt(b.split("Output")[1]);
    });

    let result = this.outputs.find((output) => {
      let max = operation.max(output.split("-")[1], this.number);
      return max !== this.number;
    });

    if (result) {
      this.folderToSearch += result;
    } else {
      console.log(
        `\n${this.number} is bigger than what we have in outputs.\nUse isPrime method`
      );
    }
    return result;
  };

  findTheProperFile = () => {
    this.folderToSearch = "./prime-output-big/";
    let result = this.folderToSearch + this.findTheProperFolder();

    if (result) {
      result += "/all.txt";
    }
    this.fileToSearch = result;

    return result;
  };

  checkIsPrime = () => {
    let detective;
    let res = this.findTheProperFolder();

    if (res) {
      let properFolder = this.folderToSearch;
      let result = `${properFolder}/all.txt`;

      let data = fs.readFileSync(result, "utf-8");
      data = data.split(",");
      detective = data.indexOf("" + this.number) > -1 ? -1 : 1;
    } else {
      let prCheck = new Prime(this.number, 1);
      let count = prCheck.isPrime(this.number);

      detective = count ? -1 : 1;
    }
    return detective;
  };

  isPrime = () => {
    let detective = this.checkIsPrime();
    if (detective === -1) {
      console.log(`Is ${this.number} a prime number?`);
      return `\n------\n${this.number} is a prime number.\n------\n`;
    } else {
      let prChecking = new Prime(this.number, 1);
      let divisions = prChecking.numberDivisions();
      divisions = divisions.join(",");
      console.log(`Is ${this.number} a prime number?`);
      return `\n------\n${this.number} is not a prime number.\n\nIt has these divisors: ${divisions}\n------\n`;
    }
  };
}

// let number = operation.cross('90071992547408813243','1');
// let number = '135148432'
// let pr = new SearchForPrime(number);
// console.log(pr.findTheProperFolder());
// console.log(pr.isPrime())

////////////////////

// This way is much more quicker
class PrimeFromText {
  constructor() {
    this.folderToSearch = "";
    this.divisions = [1];
    this.checkingNumber = "";
    this.searchInAText = true;
  }

  findfolderToSearchIn = (num) => {
    this.checkingNumber = num; /*operation.sqrtFloor(num); */
    let prSearch = new SearchForPrime(this.checkingNumber);
    let whichFolderToSearch = prSearch.findTheProperFolder();
    if (whichFolderToSearch) {
      this.folderToSearch = prSearch.folderToSearch;
    }
    return whichFolderToSearch;
  };

  getAllFromDir = (source) => fs.readdirSync(source);

  isTheNumberIsInsideAFile = (data) => {
    this.searchInAText = false;
    return data.includes(this.checkingNumber);
  };

  primesInAText = (file) => {
    let data = fs.readFileSync(file, "utf-8");
    data = data.toString();
    data = data.split(",");
    return data;
  };

  checkIfANumberIsDividedByAPrimeInAText = (num, data) => {
    for (let i = 0; i < data.length - 1; i++) {
      let checking = operation.division(num, data[i]);
      if (!data[i].includes("(") && checking[1] === "0") {
        return [data[i], checking[0]];
      }
    }
    return [-1, -1];
  };

  checkDivisionsFromAFile = (num) => {
    let isFolder = this.findfolderToSearchIn(num);
    let result = this.folderToSearch || "./prime-output-big/output-42000000";
    let res = result + "/all.txt";

    let divisior = [-1, -1];
    let data = this.primesInAText(res);
    if (this.searchInAText) {
      let checkIfTheNumIsSavedText =
        isFolder && this.isTheNumberIsInsideAFile(data);
      if (checkIfTheNumIsSavedText) {
        return true;
      }
    }

    divisior = this.checkIfANumberIsDividedByAPrimeInAText(num, data);
    if (divisior[0] !== -1) {
      this.divisions.unshift(divisior[0]);
    }

    if (this.divisions[0] !== 1 && divisior[0] !== -1) {
      return this.checkDivisionsFromAFile(divisior[1]);
    } else {
      if (operation.max(num + "", "1763998908000169") === num) {
        let pr = new Prime(num + "", 1 + "");
        this.divisions = pr.numberDivisions();
      } else {
        if (num !== "1") {
          this.divisions.unshift(num);
        }
      }
      return this.divisions;
    }
  };

  isPrime = (num) => {
    // console.log('**Becuase of Js limitation, this works up to number: 9007199254740991\n')

    this.divisions = [1];
    let data = this.checkDivisionsFromAFile(num);

    if (
      data === true ||
      (typeof data !== "boolean" && this.divisions.length < 3)
    ) {
      return `\n${num} is a prime number.`;
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

  isPrimeFromSearchPrimeClass = (num) => {
    let prCheck = new SearchForPrime(num + "");
    return prCheck.isPrime();
  };
}

// let number = operation.cross('354554870641', '3546583')
// number = operation.cross(number, '121')
// let number = '1351484320022124'
// console.log('number:', number);
// let pr = new PrimeFromText();
// console.log(pr.findfolderToSearchIn(number))
// console.log(pr.isPrime(number));
// console.log(pr.isPrimeFromSearchPrimeClass(number))
///////////////////////////////////////////

// This way is much more quicker / If there is a folder for bigger number is exist, this will take just some seconds.

const makeATextFile = (foldername, filename, data) => {
  fs.appendFileSync(`${foldername}/${filename}`, data, (err) => {
    if (err) throw "appending error: " + err;
  });
};

class PrimeWriter {
  copyFromText = (folder, folderNumber, num, getDirsFunc, getFileFunc) => {
    if (folderNumber === num) {
      return `Output for ${num} already exists.`;
    } else {
      let dir = createAFolder(num);
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
        if (operation.max(lastData[i], num) === num || lastData[i] === num) {
          makeATextFile(dir, data[fileIndex], `${lastData[i]},`);
          count++;
        } else {
          break;
        }
      }
      console.log("Count:", count);
    }
  };

  copyAll = (getAllDirFunc, num) => {
    let source = "./prime-output-big";
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

    let dir = createAFolder(num);
    let folderSplit = outputTarget.split("output-big/");
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

    let folderNumber = this.folderNumber(folder, "prime-output-big/");

    if (folderNumber) {
      this.copyFromText(
        folder,
        folderNumber,
        num,
        pr.getAllFromDir,
        pr.fileToSearch
      );
    } else {
      let result = this.copyAll(pr.getAllFromDir, num);
      let prime = new PrimeInRange(num, 100);
      let folder = result[0];

      let folderNumber = this.folderNumber(folder, "output-");
      prime.startPrime = folderNumber;
      if (operation.min(num, "9007199254740991") === num) {
        return new primeNumberModule.PrimeInRange(+num, 1).primeFromANumber(
          result[1],
          result[4],
          +result[3],
          result[2]
        );
      }
      prime.primeFromANumber(result[1], result[4], +result[3], result[2]);
    }
    let t2 = Date.now();
    console.log("All jobs done in " + (t2 - t1) / 1000 + " seconds.");
  };
}

// let num = "41688589";
// let num = "42000000"
// let pr = new PrimeWriter();
// pr.primeToANumberFromText(num);

module.exports = { Prime, PrimeInRange, PrimeType, PrimeFromText, PrimeWriter };
