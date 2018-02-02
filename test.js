const fs = require('fs');
const findArrayDimension = require('./findArrayDimension');

describe('findArrayDimension', () => {
  test('Wrong input returns error string', () => {
    expect(findArrayDimension()).toBe('Input is not a valid array');
  });
  test('Empty array returns 1 dimension', () => {
    expect(findArrayDimension([])).toBe(1);
  });

  test('Empty nested arrays return correct dimensions', () => {
    expect(findArrayDimension([[[]]])).toBe(3);
  });

  test('One dimensional array returns one', () => {
    expect(findArrayDimension([1, 1, 1])).toBe(1);
  });

  test('Two dimensional array returns two', () => {
    expect(findArrayDimension([1, 1, [2]])).toBe(2);
    expect(findArrayDimension([1, [2], [2]])).toBe(2);
    expect(findArrayDimension([[2], [2], [2]])).toBe(2);
  });

  test('Three dimensional array returns three', () => {
    expect(findArrayDimension([[[3]]])).toBe(3);
    expect(findArrayDimension([1, [2, [3]]])).toBe(3);
    expect(findArrayDimension([1, 1, [2], [2], [2, 2, [3]], [2], 1])).toBe(3);
  });

  test('Any type of data is valid', () => {
    expect(findArrayDimension(['1', 1, { bar: 'foo' }])).toBe(1);
    expect(findArrayDimension(['1', [2, { bar: 'foo' }, [3, [null]], '2']])).toBe(4);
    expect(findArrayDimension(['1', [2, { bar: 'foo' }, [3, [null, [undefined]]], '2']])).toBe(5);
  });
});
