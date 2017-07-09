//const fs = require('fs');
//const fileStr = fs.readFileSync('./test.css').toString();
//const neededStyles = require('./HTMLParser.js').output;

/**
 * given an array of tags, classes, and styles, generates an array of regex's to
 * describe them
 * @param {2D array of Strings} arr
 * @return an array of regex's that describe the needed styles
 */
var formRegexArr = function (arr) {
  var result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let c = 0; c < arr[i].length; c++) {
      let reg;
      let prefix = '';
      //tag requires no prefix
      if (i === 1) {
        prefix = '.';
      } else if (i === 2) {
        prefix = '#';
      } else {
        //error
      }
      reg = new RegExp(prefix + arr[i][c]);
      result.push(reg);
    }
  }
  //add other needed elements
  result.push(/\*/);
  return result;
};

var parseCSS = function (fileAsString, styleStrings) {
  let regexArr = formRegexArr(styleStrings);
  let result = [];
  let fileArr = fileAsString.split('\n\n');
  for (let fileIndex = 0; fileIndex < fileArr.length; fileIndex++) {
    for (let regexIndex = 0; regexIndex < regexArr.length; regexIndex++) {
      if (regexArr[regexIndex].test(fileArr[fileIndex])) {
        result.push(fileArr[fileIndex]);
      }
    }
  }
  return result;
};

module.exports = {
  parseCSS: parseCSS
};

// var regexs = formRegexArr(neededStyles);
// console.log(parseCSS(fileStr, regexs).join('\n\n'));
