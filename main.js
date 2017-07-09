const fs = require('fs');
const CSSParser = require('./Parsers/CSSParser.js').parseCSS;
const HTMLParser = require('./Parsers/HTMLParser.js').parseHTML;
const walkSync = require('./Parsers/DirectoryReader.js').walkSync;
// const HTMLfilename = '/Users/max/Fullstack/Personal/Compstyler/Test-Files/index.html';
const CSSfilename = './Test-Files/test.css';
const outputFilename = './Test-Files/output.css';

function getNeededStylesFromHTML(dirName) {
  let HTMLFileNames = [];
  let allFileNames = walkSync(dirName);
  allFileNames.forEach(fileName => {
    if (fileName.indexOf('.html') !== -1) HTMLFileNames.push(fileName);
  });
  let requiredStyles;
  HTMLFileNames.forEach((fileName) => {
    requiredStyles = HTMLParser(fileName, requiredStyles);
  });
  return requiredStyles;
}

function getNeededStylesFromCSS(dirName, neededStyles) {
  let CSSFileNames = [];
  let allFileNames = walkSync(dirName);
  allFileNames.forEach(fileName => {
    if (fileName.indexOf('.css') !== -1) CSSFileNames.push(fileName);
  });
  console.log(CSSFileNames);
  let requiredStyles = [];
  CSSFileNames.forEach((fileName) => {
    let temp = CSSParser(fileName, neededStyles);
    console.log(requiredStyles, 'styles');
    temp.forEach((style) => {
      requiredStyles.push(style);
    });
  });
  return requiredStyles;
}
function main (dirName) {
  dirName = dirName || __dirname;
  let styles = getNeededStylesFromHTML(dirName);
  let parsedCssArr = getNeededStylesFromCSS(dirName, styles);
  let parsedCssStr = parsedCssArr.join('\n\n');
  fs.writeFileSync(outputFilename, parsedCssStr);
}
main(__dirname);
