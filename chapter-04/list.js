function arrayToList(array) {
  var object = null;
  for (var i = array.length - 1; i >= 0; i--) {
    object = {
    	value: array[i],
      	rest: object
    };
  }
  return object;
}

// For-loop variant
function listToArray(list) {
  var array = [];
  for (var node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

// While-loop variant
function listToArray(list) {
  var array = [];
  while (list != null) {
    array.push(list.value);
    list = list.rest;
  }
  return array;
}

function prepend(element, list) {
  return object = {
    value: element,
    rest: list
  }
}

function nth(list, index) {
  if (!list)
    return undefined;
  else if (n == 0)
    return list.value;
  else
    return nth(list.rest, n - 1);
}
