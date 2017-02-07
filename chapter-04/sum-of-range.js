/*
  >> Assignment <<
  Write a range function that takes two arguments, start and end, and returns an array containing all the numbers from start up to (and including) end.

  Next, write a sum function that takes an array of numbers and returns the sum of these numbers.

  As a bonus assignment, modify your range function to take an optional third argument that indicates the “step” value used to build up the array. If no step is given, the array elements go up by increments of one, corresponding to the old behavior. 
*/

function range(start, stop, step = 1) {
  var numberRange = [];

  for (var i = start; (step < 0) ? (i >= stop) : (i <= stop); i += step) {
    numberRange.push(i);
  }
  return numberRange;
}

function sum(range) {
  var total = 0;
  for (var i=0; i < range.length; i++) {
    total += range[i];
  }
  return total;
}
