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

// time complexity: O(n^2)
// space complexity: O(n)

module.exports = findDimension;
