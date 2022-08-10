# Prime Numbers

When you run `npm install fm-prime-py`, the `fm-prime-py` folder will be downloaded to your `node_modules`. you can copy all the files inside it to your root file and you can use them.

## `prime.py`

- division : To find a division of a number

- allDivisions: To find all the divisions of a number

- ifPrime: to check if a number is prime or not

- isSophiePrime: to check if a number is Sophie prime or not.

- isMersennePrime: to check if a number is Mersenne prime or not.

- isTwinPrime: to check if a number is Twin prime or not.

- isIsolatedPrime : to check if a number is Isolated prime or not.

- primesOrCounts: Will find all the primes or count the primes till a number.

- primes: to find all the primes till a number.

- primesCount : to count all the primes till a number.

- primesInRange: to find all the numbers between two numbers, or count them.

- primeInRangeObj: to find all the primes between two number and make the output to be as dictionary.

<br>

## `primeTextWay.py`

- createPrimeTextFiles: to find all the primes till a number and create prime files.

- primeInRangeObjTextWay : This is much much quicker way to find all the primes and create files for those.

- checkIfPrime: Will check if a number is prime or not.

- division: to find a division from prime files.

- allDivisions: to find all the divisions from prime files.

- primes: if a number is greater than what we have on prime files, it will find that, otherwise it will copy them from prime files.

- divisionFromText: another way to find the division.

- isPrimeFromText: check if the first division (and the only) is the number itself or not.

- allPrimesFromText: this method will check if there are any files that we can check for number to if include that number, and if not, that will check the divisions. (slow way)

- allPrimes: this method will check if a number is less than greatest prime number that we have. if yes, then it will copy all the primes till that number. if the number is bigger than the greatest prime number on prime files, it will copy all the prime files and check if sqrt(number) is less than greatest prime number on file. If yes, then it will check the division for numbers and will create prime files. But if sqrt(number) is bigger than greatest prime number, then it will create files for (greatest number of the existed prime)\*\*2 and then will repeat the logic till we have the files for number.

- allPrimesSecondWay: This is so quick. this method will check if a number is less than greatest prime number that we have. if yes, then it will copy all the primes till that number. if the number is bigger than the greatest prime number on prime files, it will copy all the prime files and will create the rest using `primeInRangeObjTextWay` method.
