const fs = require('fs');
const CSSParser = require('./Parsers/CSSParser.js').parseCSS;
const HTMLParser = require('./Parsers/HTMLParser.js').parseHTML;
const HTMLfilename = './Test-Files/index.html';
const CSSfilename = './Test-Files/test.css';
const outputFilename = './Test-Files/output.css';
console.log(HTMLParser);

/**
 *
 *
 *
 * @param {String} html file name
 * @param {String} css file name
 */
function main (html, css) {
  const HTMLstring = fs.readFileSync(html).toString();
  const CSSstring = fs.readFileSync(css).toString();
  let requiredStyles = HTMLParser(HTMLstring);
  let parsedCssArr = CSSParser(CSSstring, requiredStyles);
  let parsedCssStr = parsedCssArr.join('\n');
  // console.log(parsedCss.join('\n\n'));
  fs.writeFileSync(outputFilename, parsedCssStr);
}
main(HTMLfilename, CSSfilename);
