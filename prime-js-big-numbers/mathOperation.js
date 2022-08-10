class MathOperation {
  // This method will return the digits of a number
  // numberToStringInSlots('2342') : { '0': '2', '1': '4', '2': '3', '3': '2' }
  numberToStringInSlots = (num) => {
    if (typeof num !== "string") {
      return "the input should be in string type.";
    }
    let res = {};
    for (let i = 0; i < num.length; i++) {
      res[num.length - i - 1] = num[i];
    }
    return res;
  };

  // This method will return the sum of digits of a number
  // slotsSum('2342') : 11
  slotsSum = (num) => {
    if (typeof num !== "string") {
      return "the input should be in string type.";
    }

    let sum = 0;
    for (let i = 0; i < num.length; i++) {
      sum += +num[i];
    }
    return sum;
  };

  // This method will check if a number is an even number
  // dividedBy2('2342') : true
  dividedBy2 = (num) => {
    if (typeof num !== "string") {
      return "the input should be in string type.";
    }
    return +num[num.length - 1] % 2 ? false : true;
  };

  dividedBy3 = (num) => {
    if (typeof num !== "string") {
      return "the input should be in string type.";
    }

    let sum = 0;
    for (let i = 0; i < num.length; i++) {
      sum += +num[i];
      sum %= 3;
    }
    return !sum;
  };

  dividedBy5 = (num) => {
    if (typeof num !== "string") {
      return "the input should be in string type.";
    }
    let firstDigit = num[num.length - 1];
    return firstDigit === "0" || firstDigit === "5";
  };

  dividedBy6 = (num) => {
    if (typeof num !== "string") {
      return "the input should be in string type.";
    }

    return !this.dividedBy2(num) ? false : !this.dividedBy3(num) ? false : true;
  };

  max = (num1, num2) => {
    if (typeof num1 !== "string" || typeof num2 !== "string") {
      return "the inputs should be in string type.";
    }

    const num1Size = num1.length;
    const num2Size = num2.length;

    if (num1Size > num2Size) {
      return num1;
    } else if (num1Size < num2Size) {
      return num2;
    } else {
      let index = 0;
      while (index < num1Size) {
        if (num1[index] > num2[index]) {
          return num1;
        } else if (num1[index] < num2[index]) {
          return num2;
        }
        index++;
      }
      return num1;
    }
  };

  min = (num1, num2) => {
    let max = this.max(num1, num2);
    if (max === num1) {
      return num2;
    } else if (max === num2) {
      return num1;
    } else {
      return max;
    }
  };

  add = (num1, num2) => {
    if (typeof num1 !== "string" || typeof num2 !== "string") {
      return "the inputs should be in string type.";
    }

    num1 = this.numberToStringInSlots(num1);
    num2 = this.numberToStringInSlots(num2);

    if (num1 instanceof Object && num2 instanceof Object) {
      let i = 0;
      let sumObject = {};
      while (num1[i] || num2[i]) {
        sumObject[i] = +(num1[i] || 0) + +(num2[i] || 0);
        i++;
      }

      for (let key in sumObject) {
        if (sumObject[key] >= 10) {
          let nextKey = +key + 1;
          nextKey += "";

          if (!sumObject[nextKey]) {
            sumObject[nextKey] = 0;
          }
          sumObject[nextKey] += Math.floor(sumObject[key] / 10);
          sumObject[key] = sumObject[key] % 10;
        }
      }

      let result = "";
      for (let key in sumObject) {
        result = sumObject[key] + result;
      }

      return result;
    }
  };

  subtract = (num1, num2) => {
    if (typeof num1 !== "string" || typeof num2 !== "string") {
      return "the inputs should be in string type.";
    }

    if (num1 === num2) {
      return 0;
    }

    let resultSign = this.max(num1, num2) === num1 ? 1 : -1;
    if (resultSign === -1) {
      [num1, num2] = [num2, num1];
    }

    num1 = this.numberToStringInSlots(num1);
    num2 = this.numberToStringInSlots(num2);
    if (num1 instanceof Object && num2 instanceof Object) {
      let i = 0;
      let subtractObject = {};
      while (num1[i] || num2[i]) {
        subtractObject[i] = (num1[i] || 0) - (num2[i] || 0);
        i++;
      }

      for (let key in subtractObject) {
        if (subtractObject[key] < 0) {
          let nextKey = +key + 1;
          nextKey += "";
          subtractObject[nextKey] -= 1;
          subtractObject[key] += 10;
        }
      }

      let result = "";
      for (let key in subtractObject) {
        result = subtractObject[key] + result;
      }
      let j = 0;
      while (result[j] === "0" && Number(result) !== 0) {
        if (result[j + 1] !== "0") {
          result = result.slice(j + 1);
          return resultSign === 1 ? result : "-" + result;
        }
        j++;
      }
      if (Number(result) == 0) {
        result = "0";
      }
      return resultSign === 1 ? result : "-" + result;
    }
  };

  multiply = (num, time) => {
    let max = this.max(num, time);
    if (num !== time && max === time) {
      [num, time] = [time, num];
    }

    let res = "0";
    let timeLength = time.length;

    while (timeLength > 0) {
      let result = num;

      let index = 0;
      let zeros = "";
      while (index < timeLength - 1) {
        zeros += "0";
        index++;
      }
      result += zeros;

      let timeToAdd = time[0];
      index = 1;
      let sum = "0";
      while (index <= timeToAdd) {
        sum = this.add(result, sum);
        index++;
      }
      result = sum;

      time = time.slice(1);
      timeLength = time.length;

      res = this.add(res, result);
    }

    return res;
  };

  cross = (num1, num2) => {
    let max = this.max(num1, num2);

    if (max === num2) {
      [num1, num2] = [num2, num1];
    }

    num1 = this.numberToStringInSlots(num1);
    num2 = this.numberToStringInSlots(num2);

    if (num1 instanceof Object && num2 instanceof Object) {
      let i = 0;
      let sumObject = {};
      while (num1[i]) {
        let j = 0;
        while (num2[j]) {
          if (!sumObject[i + j]) {
            sumObject[i + j] = 0;
          }
          sumObject[i + j] += num1[i] * num2[j];
          j++;
        }
        i++;
      }

      for (let key in sumObject) {
        if (sumObject[key] >= 10) {
          let nextKey = +key + 1;
          nextKey += "";

          if (!sumObject[nextKey]) {
            sumObject[nextKey] = 0;
          }
          sumObject[nextKey] += Math.floor(sumObject[key] / 10);
          sumObject[key] = sumObject[key] % 10;
        }
      }

      let result = "";
      for (let key in sumObject) {
        result = sumObject[key] + result;
      }

      return result;
    }
  };

  division = (num, dividedBy) => {
    if (typeof num !== "string" || typeof dividedBy !== "string") {
      return "the inputs should be in string type.";
    }

    if (num === dividedBy) {
      return ["1", "0"];
    }

    let numLength = num.length;
    num = this.numberToStringInSlots(num);

    let residual = "0";
    if (num instanceof Object) {
      let sumObject = {};

      for (let i = numLength - 1; i >= 0; i--) {
        let checkingNumber = num[i];
        let checkingDivision = 0;
        let diff = "+";
        while (diff[0] !== "-") {
          diff = this.subtract(checkingNumber + "", dividedBy);
          checkingNumber = diff;
          if (checkingNumber >= 0) checkingDivision++;
        }
        sumObject[i] = checkingDivision;

        if (i > 0) {
          if (diff[0] === "-" && diff.slice(1) !== dividedBy) {
            let sum = this.subtract(dividedBy, diff.slice(1));
            let cross = this.cross(sum, "10");
            num[i - 1] = this.add(num[i - 1], cross);
          }
        } else if (i <= 0 && diff[0] === "-") {
          residual = this.subtract(dividedBy, diff.slice(1));
        }
      }
      let result = "";
      for (let key in sumObject) {
        result = sumObject[key] + result;
      }
      let i = 0;
      let res = result;
      while (result[i] === "0") {
        if (result[i + 1] !== "0") {
          res = result.slice(i + 1);
        }
        i++;
      }
      if (Number(residual) === 0) {
        residual = 0;
      }
      return [res, residual + ""];
    }
  };

  sqrtFloor = (num) => {
    if (typeof num !== "string") {
      return "the input should be in string type.";
    }

    let numberToSubtract = "1";
    let result = 0;

    while (+num >= +numberToSubtract) {
      num = this.subtract(num, numberToSubtract);
      numberToSubtract = this.add(numberToSubtract, "2");
      result++;
    }

    return result + "";
  };

  power = (num, pow, result = num) => {
    if (typeof num !== "string" || typeof pow !== "string") {
      return "the inputs should be in string type.";
    }

    if (pow === "1") {
      return result;
    } else if (pow === "0") {
      return "1";
    }

    pow = this.subtract(pow, "1");
    result = this.cross(result + "", num + "");
    return this.power(num, pow, result);
  };

  toPower10Sqrt = (num) => {
    if (typeof num !== "string") {
      return "the input should be in string type.";
    }

    let numLength = num.length;
    // let numLengthPlus1 = numLength+1+'';
    let isNumLengthEven = this.dividedBy2(numLength + "");
    return isNumLengthEven
      ? this.power("10", +numLength / 2 + "")
      : this.power("10", (+numLength + 1) / 2 + "");
  };

  residual = (num1, num2) => {
    let max = this.max(num1, num2);

    if (max === num2 && max !== num1) {
      return `${num1} is smaller than ${num2}.`;
    } else if (num2 === num1) {
      return "0";
    }

    let num1Length = num1.length;
    let num2Length = num2.length;

    let residualTo10PowerOfNum2LengthPlus1 = this.power("10", num2Length + "");

    let res = this.subtract(num1.slice(num1.length - num2Length), num2);
    let ress = this.division(residualTo10PowerOfNum2LengthPlus1, num2)[1];

    let resObject = {};
    resObject[num2Length] = ress;

    for (let i = num2Length + 1; i < num1Length; i++) {
      ress = this.cross(ress, "10");
      ress = this.division(ress, num2)[1];
      resObject[i] = ress;
    }
    num1 = this.numberToStringInSlots(num1);
    let res1 = "0";
    for (let i = num2Length; i < num1Length; i++) {
      resObject[i] = this.cross(num1[i], resObject[i]);
      resObject[i] = this.division(resObject[i], num2)[1];
      res1 = this.add(res1, resObject[i]);
    }

    if (res[0] === "-") {
      res = this.subtract(res1, res.slice(1));
    } else {
      res = this.add(res1, res);
    }
    res = this.division(res, num2)[1];
    return res;
  };
}

// let mathOperation = new MathOperation();

// console.log("\x1b[36m%s\x1b[0m", "\n\n----\nFirst Part\n----\n");
// let num = "1123080483098409348";
// console.log("the number is :", num, "\n\n\n----\n");
// console.log(
//   "number slots:",
//   mathOperation.numberToStringInSlots(num),
//   "\n\n----\n"
// );
// console.log("sum of digits:", mathOperation.slotsSum(num), "\n\n----\n");
// console.log('is the number a factor of number 2 ?', mathOperation.dividedBy2(num),'\n\n----\n');
// console.log('is the number a factor of number 3 ?', mathOperation.dividedBy3(num),'\n\n----\n');
// console.log('is the number a factor of number 6 ?', mathOperation.dividedBy6(num),'\n\n----\n');
// // console.log('the floor of the sqrt of the number ?', mathOperation.sqrtFloor(num),'\n\n----\n');
// // console.log('to power10sqrt: ', mathOperation.toPower10Sqrt(num),'\n\n----\n');

// console.log('\x1b[36m%s\x1b[0m','\n\n----\nSecond Part\n----\n');
// let num1 = '1123080483098409348';
// let num2 = '13678368736786387687368';
// console.log('first number is:', num1, '| second number is: ', num2, '\n\n----\n');
// console.log('max: ', mathOperation.max(num1, num2),'\n\n----\n');
// console.log('min: ', mathOperation.min(num1, num2),'\n\n----\n');
// console.log('add: ', mathOperation.add(num1, num2),'\n\n----\n');
// console.log('subtract: ', mathOperation.subtract(num1, num2),'\n\n----\n');
// console.log('multiply: ', mathOperation.multiply(num1, num2),'\n\n----\n');
// console.log('cross ( another way of mutiply ): ', mathOperation.cross(num1, num2),'\n\n----\n');
// console.log('division: ', mathOperation.division(num2, num1),'\n\n----\n');
// console.log('residual on division: ', mathOperation.residual(num2, num1),'\n\n----\n');

// console.log('\x1b[36m%s\x1b[0m','\n\n----\nThird Part\n----\n');
// let number = '37967893679836796734'
// let pow = '10'
// console.log(`${number} ^ ${pow} is: \n\n${mathOperation.power(number, pow)}`)

// console.log('\x1b[36m%s\x1b[0m','\n\n----\ntesting-1\n----\n');
// num = '0';
// console.log('the number is :', num,'\n\n\n----\n');
// console.log('number slots:', mathOperation.numberToStringInSlots(num),'\n\n----\n');
// console.log('sum of digits:',mathOperation.slotsSum(num),'\n\n----\n');
// console.log('is the number a factor of number 2 ?', mathOperation.dividedBy2(num),'\n\n----\n');
// console.log('is the number a factor of number 3 ?', mathOperation.dividedBy3(num),'\n\n----\n');
// console.log('is the number a factor of number 6 ?', mathOperation.dividedBy6(num),'\n\n----\n');
// console.log('the floor of the sqrt of the number ?', mathOperation.sqrtFloor(num),'\n\n----\n');
// console.log('to power10sqrt: ', mathOperation.toPower10Sqrt(num),'\n\n----\n');

// console.log('\x1b[36m%s\x1b[0m','\n\n----\ntesting-2\n----\n');
// num1 = '1123080483098409348';
// num2 = '1123080483098409348';
// console.log('first number is:', num1, '| second number is: ', num2, '\n\n----\n');
// console.log('max: ', mathOperation.max(num1, num2),'\n\n----\n');
// console.log('min: ', mathOperation.min(num1, num2),'\n\n----\n');
// console.log('add: ', mathOperation.add(num1, num2),'\n\n----\n');
// console.log('subtract: ', mathOperation.subtract(num1, num2),'\n\n----\n');
// console.log('multiply: ', mathOperation.multiply(num1, num2),'\n\n----\n');
// console.log('cross ( another way of mutiply ): ', mathOperation.cross(num1, num2),'\n\n----\n');
// console.log('division: ', mathOperation.division(num2, num1),'\n\n----\n');
// console.log('residual on division: ', mathOperation.residual(num2, num1),'\n\n----\n');

// console.log('\x1b[36m%s\x1b[0m','\n\n----\ntesting-3\n----\n');
// number = '37967893679836796734'
// pow = '0'
// console.log(`${number} ^ ${pow} is: \n\n${mathOperation.power(number, pow)}`)

module.exports = MathOperation;
