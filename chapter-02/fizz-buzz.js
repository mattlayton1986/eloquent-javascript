function range(start, end) {
  if (typeof start != "number" || typeof end != "number") {
    try {
      throw new TypeError("Parameters must be of type 'number'.");
    } catch (e) {
      console.log(e.message);
    }
  }
  var numberRange = [];
  for (var i=start; i <= end; i++) {
    numberRange.push(i);
  }
  return numberRange;
}

function divisible(dividend, divisor) {
  return (dividend % divisor === 0);
}

function fizzBuzz(length = 100, conditions = [{number: 3, term: "Fizz"}, {number: 5, term: "Buzz"}], predicate = divisible) {
  var collection = range(1, length);
  var output, number, term;
  collection.map(function(i) {
    return conditions.reduce(function(output, condition) {
      if ( predicate(i, condition.number) ) {
        output += condition.term;
      }
      return output;
    }, '');
  }).map(function(output, index) {
    return output == '' ? (index + 1) : output;
  }).forEach(function(output) {
    console.log(output);
  });
}

// Example function call:
fizzBuzz();
