import os
from os import path
from glob import glob


def createAFolder(parentPath, parentName, childName):
    rootFolder = parentPath + "/" + parentName
    if not path.exists(rootFolder):
        os.mkdir(rootFolder)

    dir = rootFolder + "/" + childName
    if not path.exists(dir):
        os.mkdir(dir)
        return dir
    return False


def copyFile(mainPath, copyPath):
    os.system(f"cp {mainPath} {copyPath}")


def makeATextFile(folderPath, fileName, data):
    filepath = f"./{folderPath}/Output{fileName}.txt"
    mod = 'a'
    if not path.isfile(filepath):
        mod = 'w'
    f = open(filepath, mod)
    f.write(data)
    f.close()


def getFilesAndFoldersInsideFolder(folderPath):
    return glob(folderPath + '/*')


def getSortedInsideAFolder(folderPath):
    files = getFilesAndFoldersInsideFolder(folderPath)
    return sorted(files, key=lambda x: (len(x), x))


def findTheProperFolder(num, folderPath):
    outputs = getSortedInsideAFolder(folderPath)
    for file in outputs:
        folderNumber = int(file.split("-")[-1])
        if folderNumber >= num:
            return file

    return f"\n{num} is bigger than what we have in outputs.\n"


def findTheProperFile(num, folderPath):
    folder = findTheProperFolder(num, folderPath)
    if (folder):
        files = getSortedInsideAFolder(folder)
        res = ''
        for file in files:
            f = open(file)
            data = f.read()
            data = data.split(", ")

            firstPrimeInFile = int(data[0])
            if firstPrimeInFile > num:
                return False
            lastPrimeInFile = int(data[-2])
            condition = firstPrimeInFile <= num and lastPrimeInFile >= num

            if condition:
                res += file
                break
            f.close()

    return res if res else False


def checkIfFileIncludeAText(file, str):
    f = open(file)
    data = f.read()
    res = (f"{str}, " in data) or (f", {str}," in data)
    f.close()
    return res


def findAllFilesTillNumber(num, folderPath):
    folder = findTheProperFolder(num, folderPath)
    if folder:
        return searchAllFilesFunc(folder, num)

    return False


def searchAllFilesFunc(folderPath, num):
    result = []
    files = getSortedInsideAFolder(folderPath)
    for file in files:
        f = open(file)
        data = f.read()
        data = data.split(", ")
        firstPrimeInFile = int(data[0])
        if firstPrimeInFile > num:
            return result
        if firstPrimeInFile <= num:
            result.append(file)
        f.close()
    return result


# print(findAllFilesTillNumber(2333333, "prime-output"))
# print(checkIfFileIncludeAText(
#     "prime-output/output-10000000/Output10000.txt", "104729"))
# print(searchAllFilesFunc("prime-output/output-10000000", 3224524))
# print(findTheProperFile(2233322, "prime-output"))
# print(findTheProperFolder(221315, "prime-output"))
# makeATextFile("./till", "test", "sss")
# print(getSortedInsideAFolder("prime-output"))
# createAFolder(".", "testPy", "hi")
# copyFile("./test/standard.js", "./till")
