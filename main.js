const fs = require('fs');
const file = fs.readFileSync('./wiki.html').toString();

var searchByTypeHTML = function (fileStr) {
  //tags are just the name, so for the parser, we'll need to make a list of all the element types, and then add every style element that has that tag.
  //for the whole doc, search for the words "class" or "id"
  var classes = [];
  var tags = [];
  var ids = [];
  const fileLines = fileStr.split('\n');
  //console.log(fileLines);
  //for each line, chech each line to see if:
  //  the tag is already in tags
  //  there is a class tag
  //    if there is
  //      add every space-split element in the list of tags if it is not already there
  //  there is an id
  //     do the same as for classes
  for (let lineIndex = 0; lineIndex < fileLines.length; lineIndex++) {
    const thisLineArr = fileLines[lineIndex].split(/[ >]/);
    //loop through the line
    for (let wordIndex = 0; wordIndex < thisLineArr.length; wordIndex++) {
      let word = thisLineArr[wordIndex];
      if (word !== '') {
      //console.log(word);
        //for tags
        if (word.charAt(0) === '<') {
          let tempTag = getTag(word);
          if (tags.indexOf(tempTag) === -1 && tempTag) {
            //was undefined here, figure out why later
            tags.push(tempTag);
          }
        //for classes
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
        //for id's
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
  console.log('tags: ', tags);
  console.log('classes ', classes);
  console.log('ids ', ids);
  return [tags, classes, ids];
};
function getClass (ele) {
  //get all of the classes
  var eleArr = ele.split('"');
  var unsplit = eleArr[1];
  return unsplit.split(' ');
}
function getId (ele) {
  //seperate only for non-confusing reasons
  return getClass(ele);
}
function getTag (ele) {
  if (ele.charAt(0) !== '<') {
    console.error("getTag error:\n  Expected a string starting with '<', got ", ele);
  } else if (ele.charAt(1) !== '/') {
    let copy = ele.slice(1);
    //console.log(copy);
    return copy;
  }
}

searchByTypeHTML(file);
