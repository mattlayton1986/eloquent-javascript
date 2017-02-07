/*
>> Assignment <<

  Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions. For numbers divisible by 3, print "Fizz" instead of the number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.

  When you have that working, modify your program to print "FizzBuzz", for numbers that are divisible by both 3 and 5 (and still print "Fizz" or "Buzz" for numbers divisible by only one of those).

>> Pseudocode Algorithm <<

  for number 1 to 100
    if number % 3 or number % 5
      string = ""
      if number % 3
        string += "Fizz"
      if number % 5
        string += "Buzz"
      console.log(string)
    else
      console.log(number)
*/

/* 1. Original Design */
for (var i=1; i <= 100; i++) {
  if (i % 3 == 0 || i % 5 == 0) {
    string = "";
    if (i % 3 == 0) {
      string += "Fizz";
    }
    if (i % 5 == 0) {
      string += "Buzz";
    }
    console.log(string);
  } else {
    console.log(i);
  }
}

/* 2. Function format with parameters */
function fizzBuzz(length, fizzValue, buzzValue) {
  // Defines defaults if no parameters are passed
  var length = length || 100;
  var fizzValue = fizzValue || 3;
  var buzzValue = buzzValue || 5;

  var output;
  for (var i=1; i <= length; i++) {
    output = '';
    if (i % fizzValue === 0) {
      output += "Fizz";
    }
    if (i % buzzValue === 0) {
      output += "Buzz";
    }
    if (i % fizzValue !== 0 && i % buzzValue !== 0) {
      output += i;
    }
    console.log(output);
  }
}


/* 3. Parameterized with array inputs for more generality */
function fizzBuzz(length, numbers, terms){
	var output;
	if(numbers.length !== terms.length) {
		throw "illegal arguments!"
	}
	for(var i = 1; i <= length; i++){
		output = '';
		for(var j = 0; j < numbers.length; j++){
			if(i % numbers[j] === 0){
				output += terms[j];
			}
		}
		if(output === '') {
			output += i;
		}
		console.log(output);
	}
}

/* 4. Object parameter to eliminate implicit parameter coupling/thrown error */

function fizzBuzz(length, conditions) {
  var output;
  for (var i = 1; i <= length; i++) {
    output = "";
    var number;
    var term;
    for (var j = 0; j < conditions.length; j++) {
      number = conditions[j].number;
      term = conditions[j].term;
      if (i % number === 0) {
        output += term;
      }
    }
    if (output === "") {
      output += i;
    }
    console.log(output);
  }
}

// Example function call:
fizzBuzz( 100, [{ number: 3, term: "Fizz"}, {number: 5, term: "Buzz" }] );

/* 5. Predicates -- Functional Programming */

// Move % operation to discrete function
function divisible(dividend, divisor) {
  return (dividend % divisor === 0);
}

function fizzBuzz(predicate) {
  var output;
  for (var i = 1; i <= 100; i++) {
    output = "";
    if ( predicate(i, 3) ) {
      output += "Fizz";
    }
    if ( predicate(i, 5) ) {
      output += "Buzz";
    }
    if ( output === "" ) {
      output += i;
    }
    console.log(output);
  }
}

// Example function call:
fizzBuzz(divisible);

/* 6. Array methods: using forEach, map, reduce, object-parameters (#4), and ES6 default parameters */

 /*
 range() function I wrote yesterday (https://github.com/mattlayton1986/sum-and-range/blob/master/sum-and-range.js)
 */
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

function fizzBuzz(length, conditions, predicate) {
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
fizzBuzz(100, [{number: 3, term: "Fizz"}, {number: 5, term: "Buzz"}], divisible);
