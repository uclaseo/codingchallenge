const path = require('path');
const fs = require('fs');

const findAllFiles = (directory, extension, filter) => {
  fs.access(directory, error => {
    if (error) {
      console.log('Root Directory Does Not Exist');
    }
  });
  const fileList = [];
  const recurse = subDirectory => {
    const files = fs.readdirSync(subDirectory);
    files.map(file => {
      const filePath = `${subDirectory}/${file}`;
      const absoluteFilePath = path.join(__dirname, `${subDirectory}/${file}`);
      const fileStat = fs.statSync(absoluteFilePath);
      if (fileStat.isDirectory()) {
        recurse(filePath);
      } else {
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

console.log(findAllFiles('./webpage', 'html', 'shittylistings.com'));
