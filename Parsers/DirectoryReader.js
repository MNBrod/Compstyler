var fs = require('fs');
/**
 * given an absolute path, returns an array of the absolute path to all files
 * within that directory recursively. From
 * https://gist.github.com/VinGarcia/ba278b9460500dad1f50
 * @param {string} dir
 * @param {[]} filelist
 */
var walkSync = function (dir, filelist) {
  //console.log(dir);
  if (dir[dir.length - 1] != '/') dir = dir.concat('/');

  var files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function (file) {
    // console.log(file);
    if (file.charAt(0) === '.') return filelist;
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    } else {
      filelist.push(dir + file);
    }
  });
  return filelist;
};
// walkSync('/Users/max/Fullstack/Personal/Compstyler', []);
//console.log(walkSync('/Users/max/Fullstack/Personal/Compstyler', []));

module.exports = {walkSync};
