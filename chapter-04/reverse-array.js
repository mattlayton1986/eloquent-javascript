
/*
  Reverses an array by creating a new array and pushing contents of original array onto it in reverse order. Does NOT modify original array.
*/
function reverse(array) {
  var oldArray = array;
  var newArray = new Array(oldArray.length);
  /*
    Note to self: can't do `i < oldArray.length` because .pop() changes the length of the array it's called on (oldArray) each time its called.
  */
  for (var i = 0; i < newArray.length; i++) {
    newArray[i] = oldArray.pop();
  }
  return newArray;
}

/*
  Reverses an array in place (overwrites value of array passed in). Does NOT generate a new array.
*/
function reverseInPlace(array) {
  var temp;
  for (var i = 0; i < Math.floor(array.length / 2); i++) {

    // Put item at current array index in a temp variable.
    temp = array[i];

    // Put item in corresponding target location into slot of current index.
    array[i] = array[array.length - 1 - i];

    // Move current index item from temp variable to target location.
    array[array.length - 1 - i] = temp;
  }
  return array;
}
