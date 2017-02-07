/*
  >> Assignment <<
    Write a function, deepEqual, that takes two values and returns true only if they are the same value or are objects with the same properties whose values are also equal when compared with a recursive call to `deepEqual`.

  Parameters:
    @value1 and @value2: object or primitive type used for comparison
  Return value:
    @true if two values are the same value or are objects with same properties with equal values
*/

function deepEqual(value1, value2) {

  // If both values are primitive types, use strict equality
  if (value1 === value2) {
    return true;
  }

  // If either value is null or not an object, they won't be strictly equal.
  if (isNull(value1) || isNull(value2) ||
      notObject(value1) || notObject(value2)) {
        return false;
  }

  // Count length of properties in value1's object
  var value1Length = 0, value2Length = 0;
  for (var prop in value1) {
    value1Length += 1;
  }

  // Count length of properties in value2's object
  // Then, if a property on value2 doesn't exist on value1, or property doesn't
  // have the same value on both objects, return false
  for (var prop in value2) {
    value2Length += 1;
    if (!(prop in value1) ||
        !deepEqual(value1[prop], value2[prop])) {
      return false;
    }
  }

  // Otherwise, return true if both objects are the same length
  return value1Length == value2Length;
}

// Returns true if `value` is not an object, array, or `null`, and false otherwise
function notObject(value) {
  return typeof value != "object";
}

// Returns true if `value` is null (or undefined) and false otherwise
function isNull(value) {
  return value = null;
}
