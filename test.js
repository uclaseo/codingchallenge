const fs = require('fs');
const { findArrayDimension, Array } = require('./findArrayDimension');

describe('findArrayDimension', () => {
  test('Wrong input returns error string', () => {
    expect(findArrayDimension()).toBe('Input is not a valid array');
    expect(findArrayDimension(1)).toBe('Input is not a valid array');
    expect(findArrayDimension({ array: [] })).toBe('Input is not a valid array');
    // Since Array.prototype.findArrayDimension is (implemented) prototypal method of Array,
    // it cannnot be called unless it is an array
  });
  test('Empty array returns 1 dimension', () => {
    expect(findArrayDimension([])).toBe(1);
    expect([].findArrayDimension()).toBe(1);
  });

  test('Empty nested arrays return correct dimensions', () => {
    expect(findArrayDimension([[[]]])).toBe(3);
    expect([[[]]].findArrayDimension()).toBe(3);
  });

  test('One dimensional array returns one', () => {
    expect(findArrayDimension([1, 1, 1])).toBe(1);
    expect([1, 1, 1].findArrayDimension()).toBe(1);
  });

  test('Two dimensional array returns two', () => {
    const twoDimensionalTestArrays = [
      [1, 1, [2]],
      [1, [2], [2]],
      [[2], [2], [2]]
    ];
    twoDimensionalTestArrays.forEach((eachTestArray) => {
      expect(findArrayDimension(eachTestArray)).toBe(2);
      expect(eachTestArray.findArrayDimension()).toBe(2);
    })
  });

  test('Three dimensional array returns three', () => {
    const threeDimensionalTestArrays = [
      [[[3]]],
      [1, [2, [3]]],
      [1, 1, [2], [2], [2, 2, [3]], [2], 1]
    ];
    threeDimensionalTestArrays.forEach((eachTestArray) => {
      expect(findArrayDimension(eachTestArray)).toBe(3);
      expect(eachTestArray.findArrayDimension()).toBe(3);
    })
  });

  test('Any type of data is valid', () => {
    expect(findArrayDimension(['1', 1, { bar: 'foo' }])).toBe(1);
    expect(findArrayDimension(['1', [2, { bar: 'foo' }, [3, [null]], '2']])).toBe(4);
    expect(findArrayDimension(['1', [2, { bar: 'foo' }, [3, [null, [undefined]]], '2']])).toBe(5);
    expect(['1', 1, { bar: 'foo' }].findArrayDimension()).toBe(1);
    expect(['1', [2, { bar: 'foo' }, [3, [null]], '2']].findArrayDimension()).toBe(4);
    expect(['1', [2, { bar: 'foo' }, [3, [null, [undefined]]], '2']].findArrayDimension()).toBe(5);
  });
});
