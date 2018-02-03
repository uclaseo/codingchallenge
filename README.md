# Project Title

Coding Challenge

## Getting Started

All scripts are in Javascript(Node).

### Prerequisites

Install dependencies.
```
npm install
or
yarn install
```
Create API_KEY.js in the root folder, and add the following:
```
const API_KEY = 'API KEY HERE';
module.exports = API_KEY;
```

## Running the tests

Run test for findArrayDimension.js
```
npm test
or
yarn test
```

## Commands with findAllFiles

findAllFiles will search all folders within given folder, for given extension files, that have contents of interest
It will take three or four parameters:
root directory, file extension, contents to look for, and remove option to commenting out the contents(only works for html).
Example Command:

```
node findAllFiles.js ./website html href=\"shittylistings.com\" remove
```