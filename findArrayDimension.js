// Version1 (Plain Function)

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
    // And since I'm not making any changes to the original array, and I just want to see how many nested (or dimensions) exist in the array,
    // forEach should work fine.
    // But I prefer to use map to forEach, because map creates/returns a new array and does not mutate the original array.
    // And this is a standard practice for functional programming.
    subArray.map(element => {
      if (element instanceof Array) {
        recurse(element, currentDimension + 1);
      }
    });
    return maxDimension;
  };
  return recurse(array, maxDimension);
};

// Version2(Implemented);

Array.prototype.findArrayDimension = function () {
  let maxDimension = 1;
  if (this.length === 0) {
    return 1;
  }
  console.log(this);
  const recurse = (subArray, currentDimension) => {
    if (currentDimension > maxDimension) {
      maxDimension = currentDimension;
    }
    console.log(subArray);
    subArray.map(element => {
      if (Array.isArray(element)) {
        recurse(element, currentDimension + 1);
      }
    });
    console.log(maxDimension);
    return maxDimension;
  };
  return recurse(this, maxDimension);
};

console.log([1, 2, 3, [5], []].findArrayDimension());

module.exports = {
  findArrayDimension,
  Array
};
