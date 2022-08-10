# Prime Numbers

Run `npm run fm-prime` and by requiring it, you can work with it. The main file is `primeTextWay.js`, but you can require other js files. For python one, you can check inside `node_modules` and copy all the files inside `prime-py` into your root file and then you can use them. You can create prime files by using this way, but you do not have access to the existing `prime-output` or `prime-output-big` folders.

Thus, at first you can run `mv ./node_modules/fm-prime/prime-output .` and `mv ./node_modules/fm-prime/prime-output-big .`. Even if you want, you can run `mv ./node_modules/fm-prime .` and it will give you all the files. and you can use them.

The point is: by just requiring it, you do not have access to `prime-output` or `prime-output-big` folder. You can create files by your own using

<hr>
<br>

## `prime-js`

- On this folder, there is another [Readme](./prime-js/ReadMe.md)

- Different ways for dealing with prime numbers.

- The output of each js file can be executed using node. The prime files output can be saved on prime-output folder. (if you run it from root, otherwise it will be saved on the path that you run it. Then better to for example run `node ./prime-js/primeTextWay.js`)

- Javascript can not deal with big number. By big numbers I mean any numbers bigger than `9007199254740991`. Always need to check the number and if it works on that number. ( how? easy: run `num + 1 == num` and if it is true, it means js can not deal with it). One example is `primeSixthWay.js`. There are some lines that need to square a number, and that will make some issues.

- To deal with JS limitation on big numbers, you can use `prime-js-big-numbers` which will work with `mathOperation.js` which can deal with big numbers. Or you can work with python on `prime-py` folder.

<br>

## `prime-js-big-numbers`

- On this folder, there is another [Readme](./prime-js-big-numbers/ReadMe.md)

- Different ways for dealing with prime numbers.

- The output of `primeString.js` file can be executed using node. The prime files output can be saved on prime-output-big folder. (if you run it from root, otherwise it will be saved on the path that you run it. Then better to for example run `node ./prime-js-big-numbers/primeString.js`)

- Javascript can not deal with big number. By big numbers I mean any numbers bigger than `9007199254740991`. Always need to check the number and if it works on that number. ( how? easy: run `num + 1 == num` and if it is true, it means js can not deal with it). This folder is to deal and work with big numbers on js. (Better to work with prime-py)

<br>

## `prime-py`

- On this folder, there is another [Readme](./prime-py/ReadMe.md)

- Different ways for dealing with prime numbers.

- The output of `primeString.js` file can be executed using python3. The prime files output can be saved on prime-output folder. (if you run it from root, otherwise it will be saved on the path that you run it. Then better to for example run `python3 prime-py/primeTextWay.py`)
