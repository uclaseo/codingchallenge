// nodeJS script

const path = require('path');
const fs = require('fs');

const findAllFiles = (directory, extension, filter) => {
  // usually, asynchronous functions are preferred to synchronous.
  // but for the purpose of this assignment, there is no reason to use asynchronous, and make the code more complex.
  if (!fs.existsSync(directory)) {
    return 'The Folder Does Not Exist';
  }
  const fileList = [];
  const recurse = subDirectory => {
    const files = fs.readdirSync(subDirectory);
    files.map(file => {
      const filePath = `${subDirectory}/${file}`;
      const absoluteFilePath = path.join(__dirname, `${subDirectory}/${file}`);
      const fileStat = fs.statSync(absoluteFilePath);
      if (fileStat.isDirectory()) {
        recurse(filePath);
      } else if (file.endsWith(extension)) {
        const data = fs.readFileSync(filePath, 'utf8');
        if (data.indexOf(filter) >= 0) {
          fileList.push(filePath);
        }
      }
    });
  };

  recurse(directory);
  return fileList;
};

const directory = process.argv[2];
const extension = process.argv[3];
const filter = process.argv[4];




// console.log(findAllFiles('./website', '.html', 'shittylistings.com'));
console.log(findAllFiles(directory, extension, filter));
