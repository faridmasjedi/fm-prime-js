import math


def division(num):
    if not (num % 2):
        return 2
    if not (num % 3):
        return 3

    lastNumberToCheck = int(num ** 0.5)
    index = 1
    trendNum = 6 * index - 1
    nextTrendNum = trendNum + 2

    while trendNum <= lastNumberToCheck:
        if not num % trendNum:
            return trendNum
        elif not num % nextTrendNum:
            return nextTrendNum

        index += 1
        trendNum = 6 * index - 1
        nextTrendNum = trendNum + 2

    return num


def allDivisions(num):
    result = {}
    while num != 1:
        div = division(num)
        if result.get(div):
            result[div] += 1
        else:
            result[div] = 1

        num //= div
    return scientificWayOfNum(result)


def scientificWayOfNum(obj):
    res = ''
    for k in obj:
        power = obj[k]

        res += f"{k} x " if power == 1 else f"{k} ** {obj[k]} x "

    return res[:-2]


def ifPrime(num):
    if num == 1:
        return False
    if num == 2 or num == 3:
        return True
    if num % 6 != 1 and num % 6 != 5:
        return False
    return num == division(num)


def isSophiePrime(num):
    ifPrimeCheck = ifPrime(num)
    if ifPrimeCheck:
        isSophie = ifPrime(2 * num + 1)
        if isSophie:
            return f"{num} is a Sophie Prime."
        else:
            return f"{num} is not a Sophie Prime."
    return f"{num} is not a Prime."


def isMersennePrime(num):
    ifPrimeCheck = ifPrime(num)

    if ifPrimeCheck:
        mersennePrime = 2 ** num - 1
        isMersenne = ifPrime(mersennePrime)
        if isMersenne:
            return f"{num} is a Mersenne Prime."
        else:
            return f"{num} is not a Mersenne Prime."
    return f"{num} is not a Prime."


def isTwinPrime(num):
    res = ''

    ifPrimeCheck = ifPrime(num)
    if ifPrimeCheck:
        twinFirst = num - 2
        twinSecond = num + 2

        isTwinFirst = ifPrime(twinFirst)
        isTwinSecond = ifPrime(twinSecond)

        if isTwinFirst:
            res += f"{num} & {twinFirst} : Twins\n"
        if isTwinSecond:
            res += f"{num} & {twinSecond} : Twins\n"

    else:
        return f"{num} is not a Prime."

    return res if res else "No Twins"


def isIsolatedPrime(num):
    res = isTwinPrime(num)
    if res == "No Twins":
        return f"{num} is an Isolated Prime."
    elif "not a Prime" in res:
        return res
    else:
        return f"{num} is not an Isolated Prime.\n{res}"


def primesOrCounts(num, countFlag=False):
    if num == 2:
        return 1 if countFlag else "2"
    if num == 3:
        return 2 if countFlag else "2, 3"

    result = "2, 3, "
    count = 2
    numberToAdd = 4
    numberToInvestigate = 5

    while numberToInvestigate <= num:
        if numberToInvestigate == division(numberToInvestigate):
            count += 1
            result = count if countFlag else result + \
                f"{numberToInvestigate}, "

        numberToAdd = 4 if numberToAdd == 2 else 2

        numberToInvestigate += numberToAdd

    return result if countFlag else result[:-2]


def primes(num):
    return primesOrCounts(num)


def primesCount(num):
    return primesOrCounts(num, True)


def primesInRange(firstNum, lastNum, countFlag=False):
    result = 0 if countFlag else ""
    if firstNum < 3 and lastNum >= 3:
        result += 2 if countFlag else "2, 3, "
    elif (firstNum >= 3 and firstNum < 5) and lastNum >= 3:
        result += 1 if countFlag else "3, "

    checkIndex = (firstNum-1)//6 + 1
    checkNum1 = 6 * checkIndex - 1
    checkNum2 = 6 * checkIndex + 1
    checkFlag = checkNum1 >= firstNum
    numberToInvestigate = checkNum1 if checkFlag else checkNum2
    numberToAdd = 2 if checkFlag else 4

    while numberToInvestigate <= lastNum:
        if ifPrime(numberToInvestigate):
            result += 1 if countFlag else f"{numberToInvestigate}, "

        numberToInvestigate += numberToAdd
        numberToAdd = 4 if numberToAdd == 2 else 2

    return result if countFlag else result[:-2]


def primeInRangeObj(firstNum, lastNum):
    count = 0
    counter = count
    res = {}
    result = ""
    if firstNum < 3 and lastNum >= 3:
        result += "2, 3, "
        count += 2
    elif (firstNum >= 3 and firstNum < 5) and (lastNum >= 3):
        result += "3, "
        count += 1

    checkIndex = (firstNum - 1) // 6 + 1
    checkNum1 = 6 * checkIndex - 1
    checkNum2 = 6 * checkIndex + 1
    checkFlag = checkNum1 >= firstNum
    numberToInvestigate = checkNum1 if checkFlag else checkNum2
    numberToAdd = 2 if checkFlag else 4

    while numberToInvestigate <= lastNum:
        if ifPrime(numberToInvestigate):
            result += f"{numberToInvestigate}, "
            count += 1

        if count == 10000:
            counter += 10000
            res[counter] = result
            count = 0
            result = ""

        numberToInvestigate += numberToAdd
        numberToAdd = 4 if numberToAdd == 2 else 2

    if count % 10000 != 0:
        res[counter + count] = result
    return res


# print(primeInRangeObj(1, 100000))
# print(primesOrCounts(1000000, True))
# print(isIsolatedPrime(17))
# print(ifPrime(23))
# print(allDivisions(1222))
