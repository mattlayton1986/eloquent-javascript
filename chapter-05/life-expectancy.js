/*
>> Assignment <<
When we looked up all the people in our data set that lived more than 90 years, only the latest generation in the data came out. Let’s take a closer look at that phenomenon.

Compute and output the average age of the people in the ancestry data set per century. A person is assigned to a century by taking their year of death, dividing it by 100, and rounding it up, as in Math.ceil(person.died / 100).

Bonus: Write a function groupBy that abstracts the grouping operation. It should accept as arguments an array and a function that computes the group for an element in the array and returns an object that maps group names to arrays of group members.
*/

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

function calcAge(person) {
  return person.died - person.born;
}

function groupBy(array, century) {
	var groups = {};
  	array.forEach(function(person) {
    	var group = century(person);
      	if (group in groups) {
        	groups[group].push(calcAge(person));
        } else {
        	groups[group] = [calcAge(person)];
        }
    });
  	return groups;
}

var centuries = groupBy(ancestry, function(person) {
	return Math.ceil(person.died / 100);
});

function averages(object) {
	for (var prop in object) {
    	console.log(prop + ": " + average(object[prop]));
    }
}

averages(centuries);
