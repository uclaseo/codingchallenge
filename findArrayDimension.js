const findDimension = array => {
  let maxDimension;
  if (array instanceof Array) {
    maxDimension = 1;
  } else {
    return 'Input is not a valid array';
  }
  const recurse = (subArray, currentDimension) => {
    if (currentDimension > maxDimension) {
      maxDimension = currentDimension;
    }
    subArray.map(element => {
      if (element instanceof Array) {
        recurse(element, currentDimension + 1);
      }
    });
    return maxDimension;
  };
  return recurse(array, maxDimension);
};

// const array = [1, 1, 1, [2], [2, 2, 2], 1, [2, [3], [3], 2, [3, [4, 'hello', 4, [5]], 3], 2], 1];

// console.log(findDimension(array));

// time complexity: O(2^n)
// space complexity: O(n)

module.exports = findDimension;
