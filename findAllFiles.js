// nodeJS script
// node findAllFiles.js ./website html href=\"shittylistings.com\" remove

const path = require('path');
const fs = require('fs');

const findAllFiles = (directory, extension, filter, option) => {
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

          // find all links that has the filter parameter, and comment it out.
          // this would only work for .html extension, since context for commenting out is specific to HTML.
          if (option === 'remove') {
            const startingIndex = data.lastIndexOf('<a', data.indexOf(filter));
            const endingIndex = data.indexOf('</a>', data.indexOf(filter)) + 3;
            const newFilter = data.substring(startingIndex, endingIndex + 1);
            const newData = data.replace(newFilter, `<!-- ${newFilter} -->`);
            fs.writeFileSync(filePath, newData);
          }
        }
      }
    });
  };
  recurse(directory);

  // create a list.txt with list of all files
  const fileListWithBreaks = fileList.join('\n');
  fs.writeFileSync('list.txt', fileListWithBreaks);

  return fileList;
};

const directory = process.argv[2];
const extension = process.argv[3];
const filter = process.argv[4];
const option = process.argv[5];

findAllFiles(directory, extension, filter, option);
