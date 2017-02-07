/*
>> Assignment <<
  Write a function countBs that takes a string as its only argument and returns a number that indicates how many uppercase “B” characters are in the string.

  Next, write a function called countChar that behaves like countBs, except it takes a second argument that indicates the character that is to be counted (rather than counting only uppercase “B” characters). Rewrite countBs to make use of this new function.
*/

function countBs(string) {
  var count = 0;
  for (var i = 0; i < string.length; i++) {
    if (string.charAt(i) === "B") {
      count += 1;
    }
  }
  return count;
}

function countChar(string, char) {
  var count = 0;
  for (var i = 0; i < string.length; i++) {
    if (string.charAt(i) === char) {
      count += 1;
    }
  }
  return count;
}
