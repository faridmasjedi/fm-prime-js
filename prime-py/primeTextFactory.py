from textFactory import *
import math

folderPath = "prime-output"


def createAFolderForPrime(number, folderPathway=folderPath):
    createAFolder(".", folderPathway, f"output-{number}")


def makeATextFileForPrime(folderNumber, fileIndex, data, folderPathway=folderPath):
    makeATextFile(f"{folderPathway}/output-{folderNumber}", fileIndex, data)


def getSortedAllPrimeFolders():
    return getSortedInsideAFolder(folderPath)


def getSortedAllPrimeFilesInAFolder(foldername):
    return getSortedInsideAFolder(foldername)


def findLastFolder():
    folders = getSortedInsideAFolder(folderPath)
    return folders[-1]


def findTheProperFolderForPrime(num):
    return findTheProperFolder(num, folderPath)


def findTheProperFileForPrime(num):
    return findTheProperFile(num, folderPath)


def findAllFilesForDivision(num):
    return findAllFilesTillNumber(num, folderPath)


def allNumbersInFileArr(file):
    f = open(file)
    data = f.read()
    data = data[:-2]
    data = data.split(", ")
    f.close()
    return data


def isPrime(num):
    file = findTheProperFileForPrime(num)
    if not file:
        return False

    return checkIfFileIncludeAText(file, num)


def copyFiles(files, newFolderNum, whichIndex):
    for i in range(0, whichIndex):
        copyFile(
            files[i], f"{folderPath}/output-{newFolderNum}/Output{files[i].split('Output')[1]}")


# createAFolderForPrime(123)
# makeATextFileForPrime(123, 440000, "sss")
# copyFiles(['prime-output/output-10000000/Output440000.txt'], 123,
#           ['prime-output/output-10000000/Output440000.txt'], 1)


# print(isPrime(1224883))
# print(allNumbersInFileArr("prime-output/output-100/Output25.txt"))
# print(findAllFilesForDivision(2333333))
# print(findTheProperFileForPrime(2333333))
# print(findLastFolder())
# print(getSortedAllPrimeFilesInAFolder(10000000))
# print(getSortedAllPrimeFolders())
# createAFolderForPrime(123)
# makeATextFileForPrime(123, "hi", "sss")
