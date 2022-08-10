// This method will return the digits of a number
// numberToStringInSlots('2342') : { '0': '2', '1': '4', '2': '3', '3': '2' }
const numberToStringInSlots = (num) => {
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
const slotsSum = (num) => {
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
const dividedBy2 = (num) => {
  if (typeof num !== "string") {
    return "the input should be in string type.";
  }
  return +num[num.length - 1] % 2 ? false : true;
};

const dividedBy3 = (num) => {
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

const dividedBy5 = (num) => {
  if (typeof num !== "string") {
    return "the input should be in string type.";
  }
  let firstDigit = num[num.length - 1];
  return firstDigit === "0" || firstDigit === "5";
};

const dividedBy6 = (num) => {
  if (typeof num !== "string") {
    return "the input should be in string type.";
  }

  return !dividedBy2(num) ? false : !dividedBy3(num) ? false : true;
};

const max = (num1, num2) => {
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

const min = (num1, num2) => {
  let maxx = max(num1, num2);
  if (maxx === num1) {
    return num2;
  } else if (maxx === num2) {
    return num1;
  } else {
    return maxx;
  }
};

const add = (num1, num2) => {
  if (typeof num1 !== "string" || typeof num2 !== "string") {
    return "the inputs should be in string type.";
  }

  num1 = numberToStringInSlots(num1);
  num2 = numberToStringInSlots(num2);

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

const subtract = (num1, num2) => {
  if (typeof num1 !== "string" || typeof num2 !== "string") {
    return "the inputs should be in string type.";
  }

  if (num1 === num2) {
    return 0;
  }

  let resultSign = max(num1, num2) === num1 ? 1 : -1;
  if (resultSign === -1) {
    [num1, num2] = [num2, num1];
  }

  num1 = numberToStringInSlots(num1);
  num2 = numberToStringInSlots(num2);
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

const multiply = (num, time) => {
  let maxx = max(num, time);
  if (num !== time && maxx === time) {
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
      sum = add(result, sum);
      index++;
    }
    result = sum;

    time = time.slice(1);
    timeLength = time.length;

    res = add(res, result);
  }

  return res;
};

const cross = (num1, num2) => {
  let maxx = max(num1, num2);

  if (maxx === num2) {
    [num1, num2] = [num2, num1];
  }

  num1 = numberToStringInSlots(num1);
  num2 = numberToStringInSlots(num2);

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

const division = (num, dividedBy) => {
  if (typeof num !== "string" || typeof dividedBy !== "string") {
    return "the inputs should be in string type.";
  }

  if (num === dividedBy) {
    return ["1", "0"];
  }

  let numLength = num.length;
  num = numberToStringInSlots(num);

  let residual = "0";
  if (num instanceof Object) {
    let sumObject = {};

    for (let i = numLength - 1; i >= 0; i--) {
      let checkingNumber = num[i];
      let checkingDivision = 0;
      let diff = "+";
      while (diff[0] !== "-") {
        diff = subtract(checkingNumber + "", dividedBy);
        checkingNumber = diff;
        if (checkingNumber >= 0) checkingDivision++;
      }
      sumObject[i] = checkingDivision;

      if (i > 0) {
        if (diff[0] === "-" && diff.slice(1) !== dividedBy) {
          let sum = subtract(dividedBy, diff.slice(1));
          let crosss = cross(sum, "10");
          num[i - 1] = add(num[i - 1], crosss);
        }
      } else if (i <= 0 && diff[0] === "-") {
        residual = subtract(dividedBy, diff.slice(1));
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

const sqrtFloor = (num) => {
  if (typeof num !== "string") {
    return "the input should be in string type.";
  }

  let numberToSubtract = "1";
  let result = 0;

  while (+num >= +numberToSubtract) {
    num = subtract(num, numberToSubtract);
    numberToSubtract = add(numberToSubtract, "2");
    result++;
  }

  return result + "";
};

const power = (num, pow, result = num) => {
  if (typeof num !== "string" || typeof pow !== "string") {
    return "the inputs should be in string type.";
  }

  if (pow === "1") {
    return result;
  } else if (pow === "0") {
    return "1";
  }

  pow = subtract(pow, "1");
  result = cross(result + "", num + "");
  return power(num, pow, result);
};

const toPower10Sqrt = (num) => {
  if (typeof num !== "string") {
    return "the input should be in string type.";
  }

  let numLength = num.length;
  // let numLengthPlus1 = numLength+1+'';
  let isNumLengthEven = dividedBy2(numLength + "");
  return isNumLengthEven
    ? power("10", +numLength / 2 + "")
    : power("10", (+numLength + 1) / 2 + "");
};

const residual = (num1, num2) => {
  let maxx = max(num1, num2);

  if (maxx === num2 && maxx !== num1) {
    return `${num1} is smaller than ${num2}.`;
  } else if (num2 === num1) {
    return "0";
  }

  let num1Length = num1.length;
  let num2Length = num2.length;

  let residualTo10PowerOfNum2LengthPlus1 = power("10", num2Length + "");

  let res = subtract(num1.slice(num1.length - num2Length), num2);
  let ress = division(residualTo10PowerOfNum2LengthPlus1, num2)[1];

  let resObject = {};
  resObject[num2Length] = ress;

  for (let i = num2Length + 1; i < num1Length; i++) {
    ress = cross(ress, "10");
    ress = division(ress, num2)[1];
    resObject[i] = ress;
  }
  num1 = numberToStringInSlots(num1);
  let res1 = "0";
  for (let i = num2Length; i < num1Length; i++) {
    resObject[i] = cross(num1[i], resObject[i]);
    resObject[i] = division(resObject[i], num2)[1];
    res1 = add(res1, resObject[i]);
  }

  if (res[0] === "-") {
    res = subtract(res1, res.slice(1));
  } else {
    res = add(res1, res);
  }
  res = division(res, num2)[1];
  return res;
};

const ceil = (num, devidedBy) => {
  if (typeof num !== "string" || typeof devidedBy !== "string") {
    return "the input should be in string type.";
  }

  let dev = division(num, devidedBy);
  return dev[1] === "0" ? dev[0] : add(dev[0], "1");
};

const floor = (num, devidedBy) => {
  if (typeof num !== "string" || typeof devidedBy !== "string") {
    return "the input should be in string type.";
  }

  let dev = division(num, devidedBy);
  return dev[0];
};

module.exports = {
  numberToStringInSlots,
  slotsSum,
  dividedBy2,
  dividedBy3,
  dividedBy5,
  dividedBy6,
  max,
  min,
  add,
  subtract,
  multiply,
  cross,
  division,
  sqrtFloor,
  power,
  toPower10Sqrt,
  residual,
  ceil,
  floor,
};

console.log(division("23434", "3"));
