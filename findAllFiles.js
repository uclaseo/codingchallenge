const path = require('path');
const fs = require('fs');

const findAllFiles = (directory, extension, filter, option) => {
  // usually, asynchronous functions are preferred to synchronous.
  // asynchronous is useful when there are other processes need to be done such as http requests.
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

          // since team needs to delete all links of interest in 24 hours, 
          // simply letting computer comment all them out would be useful. 
          // this would only work for html files, since context for commenting out implemented here is specific to HTML.
          if (filter === 'html' && option === 'remove') {
            const startingIndex = data.lastIndexOf('<a', data.indexOf(filter));
            const endingIndex = data.indexOf('</a>', data.indexOf(filter)) + 3;
            const stringToBeCommented = data.substring(startingIndex, endingIndex + 1);
            const newData = data.replace(stringToBeCommented, `<!-- ${stringToBeCommented} -->`);
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

// process.argv allows to take in parameters from command line
const directory = process.argv[2];
const extension = process.argv[3];
const filter = process.argv[4];
const option = process.argv[5];

findAllFiles(directory, extension, filter, option);
