// version1 (plain function)

const findArrayDimension = array => {
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
    // forEach does not make/return a new array.  It works with original array.
    // since I'm not making any changes to the original array, and I just want to see how many nested (or dimensions) exist in the array,
    // forEach should work fine.
    // but I prefer to use map to forEach, because map creates/returns a new array and does not mutate the original array.
    // this is the standard practice for functional programming.
    subArray.map(element => {
      if (element instanceof Array) {
        recurse(element, currentDimension + 1);
      }
    });
    return maxDimension;
  };
  return recurse(array, maxDimension);
};

// version2(implemented into Array);

Array.prototype.findArrayDimension = function () {
  let maxDimension = 1;
  if (this.length === 0) {
    return 1;
  }
  const recurse = (subArray, currentDimension) => {
    if (currentDimension > maxDimension) {
      maxDimension = currentDimension;
    }
    subArray.map(element => {
      if (Array.isArray(element)) {
        recurse(element, currentDimension + 1);
      }
    });
    return maxDimension;
  };
  return recurse(this, maxDimension);
};

module.exports = {
  findArrayDimension,
  Array
};

// time complexity: O(N)
// this could be tricky, since we do not know for sure what N is.  
// if N is number of total elements in the array including its children, it would be O(N).
// if N is number of dimension, it could mean O(N^2), since number of dimensions increase number of nested arrays.

// space complexity: O(N)
// .map creates a new array everytime it's being called.
// in the worst case scenario where number of dimensions is equal to total elements in the array including its children,
// it will create a number of new arrays equal to the number of total elements.