/*
>> Assignment <<
  Arrays also come with the standard methods every and some. Both take a predicate function that, when called with an array element as argument, returns true or false. Just like && returns a true value only when the expressions on both sides are true, every returns true only when the predicate returns true for all elements of the array. Similarly, some returns true as soon as the predicate returns true for any of the elements. They do not process more elements than necessary—for example, if some finds that the predicate holds for the first element of the array, it will not look at the values after that.

  Write two functions, every and some, that behave like these methods, except that they take the array as their first argument rather than being a method.
*/

function every(a, f) {
  var flag = true;
  a.forEach(function(element) {
    if (flag) {
      flag = f(element);
    } else {
      return flag;
    }
  });
  return flag;
}

function some(a, f) {
  var flag = false;
  a.forEach(function(element) {
    if (!flag) {
      flag = f(element);
    } else {
      return flag;
    }
  });
  return flag;
}

console.log(every([NaN, NaN, NaN], isNaN),
            every([NaN, NaN, 4], isNaN),
            some([NaN, 3, 4], isNaN),
            some([2, 3, 4], isNaN));

// Alternate versions of every() and some(), after I looked at the solutions.

function every2(a, f) {
  a.forEach(function(element) {
    if (!f(element)) return false;
  });
  return true;
}

function some2(a, f) {
  a.forEach(function(element) {
    if (f(element)) return true;
  });
  return false;
}
