# Prime Numbers

- There are different classes on `primeString.js` which can deal with primes. First thing to mention is if you want to work with numbers smaller than `9007199254740991`, use `prime-js`.

## `mathOperation.js`

- Some different methods on a class to do all the necessary math operation for big numbers in js.

## `primeString.js`

- `Prime` class:

  - How to run?

    let pr = new Prime(number, 1); // number should be string. eg: "123"

    console.log(pr.isPrime()); // isPrime : check if number is prime or not

    console.log(pr.numberDivisions()); // numberDivision: show all the divisions of a number

<br>

- `PrimeType` class:

  - How to run?

    let prr = new PrimeType(number, 1); // number: should be string

    console.log(prr.isTwinPrime()); // if the number is a Twin Prime

    console.log(prr.isPrimeChecking()); // if the number is a prime or not

    console.log(prr.isIsolatedPrime()); // if the number is an Isolated Prime

    console.log(prr.isSophiePrime()); // if the number is a Sophie Prime

<br>

- `PrimeInRange` class:

  - How to run?

    let pr = new PrimeInRange(number, "1"); // number should be string

    console.log(pr.primeToANumber()); // Will find all the primes till number, and will save it on `prime-output-big` folder.

    console.log(pr.primeRange()); // Will find all the primes between two numbers and will save it into primeInARange of a class. Then you need to run `console.log(pr.primeInARange)` to check all of them.

<br>

- `SearchForPrime` class:

  - How to run?

    let pr = new SearchForPrime(number); // number should be string

    console.log(pr.findTheProperFolder()); // If there are some files on `prime-output-big`, then this will find the proper folder to check if the number is prime or no. But what is proper folder? every folder inside the `prime-output-big` has a number ( eg: output-10000 ). This means that folder contains all the primes from 1 till the number. Then the proper folder to check if a number is prime or no is to check if that file inside a folder contains that number or no. If the number is bigger than what we have on `prime-output-big`, this is not helpful.

    console.log(pr.isPrime()) // if the number is prime or no.

<br>

- `PrimeFromText` class:

  - How to run?

    let pr = new PrimeFromText();

    console.log(pr.isPrime(number)); // check if a number is prime or not. The difference with `SearchForPrime` is that if it could not find the number on files, then it will use other classes to check if a number is prime or not.

<br>

- `PrimeWriter` class: this class will deal with files and how to copy from them and how to write new files.
