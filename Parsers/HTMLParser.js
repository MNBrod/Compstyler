const fs = require('fs');
//const file = fs.readFileSync('./wiki.html').toString();
/**
 * Searches a string representaion of an HTML file for all Tags, Classes, and IDs.
 * Rides on the following assumptions:
 *    only double quotes
 *    no excess spaces
 * @param {String} fileStr
 */
function parseHTML(fileName, requiredStyles) {
  let fileStr = fs.readFileSync(fileName).toString();
  let classes = [] || requiredStyles[0];
  let tags = [] || requiredStyles[1];
  let ids = [] || requiredStyles[2];
  const fileLines = fileStr.split('\n');
  for (let lineIndex = 0; lineIndex < fileLines.length; lineIndex++) {
    const thisLineArr = fileLines[lineIndex].split(/[ >]/);
    for (let wordIndex = 0; wordIndex < thisLineArr.length; wordIndex++) {
      let word = thisLineArr[wordIndex];
      if (word !== '') {
        if (word.charAt(0) === '<') {
          let tempTag = getTag(word);
          if (tags.indexOf(tempTag) === -1 && tempTag) {
            //was undefined here, figure out why later
            tags.push(tempTag);
          }
        } else if (word.slice(0, 5) === 'class') {
          let completeLine = word;
          let i = 1;
          while (completeLine.charAt(completeLine.length - 1) !== '"') {
            completeLine += ' ' + thisLineArr[wordIndex + i];
            i++;
          }
          let classTemp = getClass(completeLine);
          for (let i = 0; i < classTemp.length; i++) {
            if (classes.indexOf(classTemp[i]) === -1) {
              classes.push(classTemp[i]);
            }
          }
        } else if (word.slice(0, 2) === 'id') {
          let completeLine = word;
          let i = 1;
          while (completeLine.charAt(completeLine.length - 1) !== '"') {
            completeLine += ' ' + thisLineArr[wordIndex + i];
            i++;
          }
          let idTemps = getId(completeLine);
          for (let i = 0; i < idTemps.length; i++) {
            if (ids.indexOf(idTemps[i]) === -1) {
              ids.push(idTemps[i]);
            }
          }
        }
      }
    }
  }
  return [tags, classes, ids];
}
/**
 *
 *
 * @param {any} ele
 * @returns
 */
function getClass(ele) {
  //get all of the classes
  var eleArr = ele.split('"');
  var unsplit = eleArr[1];
  return unsplit.split(' ');
}

function getId(ele) {
  return getClass(ele);
}

function getTag(ele) {
  if (ele.charAt(0) !== '<') {
    console.error("getTag error:\n  Expected a string starting with '<', got ", ele);
  } else if (ele.charAt(1) !== '/') {
    let copy = ele.slice(1);
    return copy;
  }
}

module.exports = {
  parseHTML: parseHTML
};
