from primeTextFactory import *
import prime
import math

folderPath = "prime-output"


def createPrimeTextFiles(num):
    dir = createAFolderForPrime(num)
    if dir == False:
        return f"Text files for primes till {num} already exist."

    data = prime.primeInRangeObj(1, num)
    for key in data:
        makeATextFileForPrime(num, key, data[key])


def primeInRangeObjTextWay(firstNum, lastNum, count=0):
    dir = createAFolderForPrime(lastNum)
    if dir == False:
        return f"Text files for primes till {lastNum} already exist."

    counter = count
    if count != 0:
        count = 0
    result = ''

    if firstNum < 3 and lastNum >= 3:
        result += "2, 3, "
        count += 2
    elif (firstNum >= 3 and firstNum < 5) and lastNum >= 3:
        result += "3, "
        count += 1

    checkIndex = math.ceil((firstNum-1) / 6)
    checkNum1 = 6 * checkIndex - 1
    checkNum2 = 6 * checkIndex + 1
    checkFlag = checkNum1 >= firstNum
    numberToInvestigate = checkNum1 if checkFlag else checkNum2
    numberToAdd = 2 if checkFlag else 4

    while numberToInvestigate <= lastNum:
        if prime.ifPrime(numberToInvestigate):
            result += f"{numberToInvestigate}, "
            count += 1
            if count == 10000:
                counter += 10000
                makeATextFileForPrime(lastNum, counter, result)
                count = 0
                result = ""

        numberToInvestigate += numberToAdd
        numberToAdd = 4 if numberToAdd == 2 else 2

    if count % 10000 != 0:
        makeATextFileForPrime(lastNum, counter + count, result)


def checkIfPrime(num):
    return isPrime(num)


def division(num):
    if num % 2 == 0:
        return 2
    if num % 3 == 0:
        return 3

    lastNumberToCheck = int(num**0.5)
    files = findAllFilesForDivision(lastNumberToCheck)

    for file in files:
        data = allNumbersInFileArr(file)
        for n in data:
            if num % int(n) == 0:
                return n

    return num


def allDivisions(num):
    result = {}

    while num != 1:
        div = division(num)
        result[div] = result[div] + 1 if result.get(div) else 1
        num //= int(div)

    return prime.scientificWayOfNum(result)


#  This function is working just when we have some prime text files
def primes(num):
    files = findAllFilesForDivision(num)

    if len(files):
        dir = createAFolderForPrime(num)

        if dir == False:
            return f"Text files for primes till {num} already exist."

        copyFiles(files, num, len(files)-1)

        data = allNumbersInFileArr(files[-1])
        res = [n for n in data if int(n) <= num]
        lastFile = files[-2] if len(files) > 1 else False
        lastCounter = int(lastFile.split("Output")[1]) if lastFile else False
        makeATextFileForPrime(num, lastCounter+len(res)
                              if lastCounter else len(res), ", ".join(res) + ", ")
    else:
        folder = findLastFolder()
        files = getSortedAllPrimeFilesInAFolder(folder)

        lastFolderNumber = int(folder.split("-")[-1])
        lastFileNumber = int((files[-1].split("Output")[1]).split(".txt")[0])
        primeInRangeObjTextWay(lastFolderNumber, num, lastFileNumber)
        copyFiles(files, num, len(files))


def divisionFromText(num):
    if num == 1:
        return -1

    checkNumber = int(num**0.5)
    files = findAllFilesForDivision(checkNumber)

    for file in files:
        data = allNumbersInFileArr(file)
        for n in data:
            if int(n) <= num and num % int(n) == 0:
                return n

    return num


def isPrimeFromText(num):
    return divisionFromText(num) == num


def allPrimesFromText(firstNum, lastNum, count=0):
    dir = createAFolderForPrime(lastNum)
    if dir == False:
        return f"Text files for primes till {lastNum} already exist."

    counter = count
    if not count:
        count = 0
    result = ''
    if firstNum < 3 and lastNum >= 3:
        result += "2, 3, "
        count += 2
    elif (firstNum >= 3 and firstNum < 5) and lastNum >= 3:
        result += "3, "
        count += 1

    checkIndex = math.ceil((firstNum-1) / 6)
    checkNum1 = 6 * checkIndex - 1
    checkNum2 = 6 * checkIndex + 1
    checkFlag = checkNum1 >= firstNum
    numberToInvestigate = checkNum1 if checkFlag else checkNum2
    numberToAdd = 2 if checkFlag else 4

    while numberToInvestigate <= lastNum:
        file = findTheProperFileForPrime(numberToInvestigate)
        if file:
            if checkIfPrime(numberToInvestigate):
                result += f"{numberToInvestigate}, "
                count += 1
        elif isPrimeFromText(numberToInvestigate):
            result += f"{numberToInvestigate}, "
            count += 1
            if count == 10000:
                counter += 10000
                makeATextFileForPrime(lastNum, counter, result)
                count = 0
                result = ''

        numberToInvestigate += numberToAdd
        numberToAdd = 4 if numberToAdd == 2 else 2

    if count % 10000 != 0:
        makeATextFileForPrime(lastNum, counter + count, result)


def copyPrimeFromExistedFiles(num, files):
    dir = createAFolderForPrime(num)
    if dir == False:
        return f"Text files for primes till {num} already exist."

    copyFiles(files, num, len(files)-1)
    data = allNumbersInFileArr(files[-1])
    res = [n for n in data if int(n) <= num]
    lastFile = files[-2] if len(files) > 1 else False
    lastCounter = int(lastFile.split("Output")[1]) if lastFile else False
    makeATextFileForPrime(num, lastCounter+len(res)
                          if lastCounter else len(res), ", ".join(res) + ", ")


def copyAndBuildPrimes(num, files, folder, lastFolderNumber, lastDivisionToCheck, counter):
    dir = createAFolderForPrime(num)
    if dir == False:
        return f"Text files for primes till {num} already exist."

    copyFiles(files, num, len(files))
    number = int(lastFolderNumber) + 1
    count = 0
    result = ""
    checkIndex = math.ceil((number-1)/6)
    checkNum1 = 6 * checkIndex - 1
    checkFlag = checkNum1 >= number
    numberToAdd = 2 if checkFlag else 4
    fs = findAllFilesForDivision(lastDivisionToCheck)

    while number <= num:
        flag = True
        for file in fs:
            data = allNumbersInFileArr(file)
            if int(data[-1]) > lastDivisionToCheck:
                data = [n for n in data if int(n) <= lastDivisionToCheck]

            for n in data:
                if number % int(n) == 0:
                    flag = False
                    break

            if not flag:
                break

        if flag:
            result += f"{number}, "
            count += 1
            if count == 10000:
                counter += 10000
                makeATextFileForPrime(num, counter, result)
                count = 0
                result = ""

        number += numberToAdd
        numberToAdd = 4 if numberToAdd == 2 else 2

    if count % 10000 != 0:
        makeATextFileForPrime(num, counter + count, result)


def buildPrimes(num, numberToCreateFiles, files, folder, lastFolderNumber, counter):
    while numberToCreateFiles <= num:
        dir = createAFolderForPrime(numberToCreateFiles)
        if dir == False:
            return f"Text files for primes till {numberToCreateFiles} already exist."

        copyFiles(files, numberToCreateFiles, len(files))
        number = int(lastFolderNumber) + 1
        count = 0
        result = ""
        checkIndex = math.ceil((number - 1) / 6)
        checkNum1 = 6 * checkIndex - 1
        checkFlag = checkNum1 >= number
        numberToAdd = 2 if checkFlag else 4

        while number <= numberToCreateFiles:
            flag = True
            lastDivisionToCheck = int(number ** 0.5)
            fs = findAllFilesForDivision(lastDivisionToCheck)

            for file in fs:
                data = allNumbersInFileArr(file)
                if int(data[-1]) > number:
                    data = [n for n in data if int(n) <= number]

                for n in data:
                    if number % int(n) == 0:
                        flag = False
                        break

                if not flag:
                    break

            if flag:
                result += f"{number}, "
                count += 1
                if count == 10000:
                    counter += 10000
                    makeATextFileForPrime(numberToCreateFiles, counter, result)
                    count = 0
                    result = ""

            number += numberToAdd
            numberToAdd = 4 if numberToAdd == 2 else 2

        if count % 10000 != 0:
            makeATextFileForPrime(numberToCreateFiles, counter+count, result)

        folder = findLastFolder()
        files = getSortedAllPrimeFilesInAFolder(folder)
        lastFolderNumber = int(folder.split("-")[-1])
        counter = int((files[-1].split("Output")[1]).split(".")[0])
        numberToCreateFiles = lastFolderNumber ** 2

    if numberToCreateFiles > num:
        allPrimes(num)


def allPrimes(num):
    files = findAllFilesForDivision(num)
    if len(files) > 0:
        copyPrimeFromExistedFiles(num, files)
    else:
        lastDivisionToCheck = int(num ** 0.5)
        folder = findLastFolder()
        files = getSortedAllPrimeFilesInAFolder(folder)
        lastFolderNumber = int(folder.split('-')[-1])
        counter = int((files[-1].split('Output')[1]).split(".")[0])

        if lastDivisionToCheck <= lastFolderNumber:
            copyAndBuildPrimes(num, files, folder,
                               lastFolderNumber, lastDivisionToCheck, counter)
        else:
            numberToCreateFiles = lastFolderNumber ** 2
            buildPrimes(num, numberToCreateFiles, files,
                        folder, lastFolderNumber, counter)


def allPrimesSecondWay(num):
    files = findAllFilesForDivision(num)
    if len(files) > 0:
        copyPrimeFromExistedFiles(num, files)
    else:
        folder = findLastFolder()
        files = getSortedAllPrimeFilesInAFolder(folder)
        lastFolderNumber = int(folder.split("-")[-1])
        counter = int((files[-1].split("Output")[1]).split(".")[0])
        primeInRangeObjTextWay(lastFolderNumber + 1, num, counter)
        copyFiles(files, num, len(files))

# allPrimesFromText(1, 200000)
# print(int(65465564729**0.5))
# print(isPrimeFromText(65465564729))
# print(divisionFromText(77))
# primes(10)
# print(allDivisions(6547117 * 65465566399))
# print(division(337))
# print(checkIfPrime(25))
# primeInRangeObjTextWay(1, 2000000)
# print(createPrimeTextFiles(200))
# print(allPrimes(1000000000))
