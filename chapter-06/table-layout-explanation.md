# The Secret Life of Objects Table Layout Explanation
## from Eloquent Javascript by Marijn Haverbeke

### Introduction
If you've tried to learn JavaScript by reading Marijn Haverbeke's _Eloquent Javascript_, Chapter 6 _The Secret Life of Objects_ has probably tripped you up bigly. I know it did for me. I read through the entire chapter two or three times and, while I understood the text's explanation about objects just fine, I got utterly and completely lost with the table layout running example.

I did some Googling and came across a couple explanations written by others that helped to explain parts of the project (namely [Codient's Blog](https://codient.blogspot.com/2015/11/laying-out-table-eloquent-javascript.html) and [fhdhsni's README](https://github.com/fhdhsni/The-Secret-Life-of-Objects) on GitHub), but not a full comprehensive explanation. And I've found the best way to learn unfamiliar code is to put it under a microscope and walk through it step by step just like the JavaScript compiler/interpreter would.

So lets get started and see how this code works. For reference, the full code is in the `table-layout.js` file in this same repository.

### Problem Domain
The problem we're attempting to solve is that given input such as this:

````
var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];
````
we want to build a nicely-formatted table in which rows are aligned, columns are straight, and columns containing numbers are right-aligned. This is the result we're looking for:

<pre>
name         height country
------------ ------ -------------
Kilimanjaro    5895 Tanzania
Everest        8848 Nepal
Mount Fuji     3776 Japan
Mont Blanc     4808 Italy/France
Vaalserberg     323 Netherlands
Denali         6168 United States
</pre>

###A 5x5 Checkerboard
To start with, we want to test out the base program by building a 5x5 text checkerboard that looks like this:

```
// -> ## __ ## __ ##
// -> __ ## __ ## __
// -> ## __ ## __ ##
// -> __ ## __ ## __
// -> ## __ ## __ ##
```
__Note:__ Apparently Markdown redacts whitespace, so the 'blank' spaces that appear in the original problem in the text have been replaced with underscores ("\__") in this explanation to hold the spaces.

We start with

```
var rows = [];
for (var i = 0; i < 5; i++) {
  var row = [];
  for (var j = 0; j < 5; j++) {
    if ((j + i) % 2 == 0) {
      row.push(new TextCell("##"));
    } else {
      row.push(new TextCell("__"));
    }
  }
  rows.push(row);
}

console.log(drawTable(rows));
```
The function call that executes this program is `console.log(drawTable(rows));`. We're passing an array called `rows` to the `drawTable` function. Once the table is drawn by that function, we then log it to the console. Lets start by looking at what the `rows` parameter is.

####Building the Rows Array
We start by declaring a new variable `rows` and initializing it as an empty array: `var rows = [];`. This is the array that we will eventually pass as the parameter to the drawTable() function, but we have to build the rows array first. Right now its just empty.

Lets keep in mind what our final product is going to be: a 5x5 checkerboard. Thus, its a two-dimensional construct (having x-axis and y-axis), which will be important for our table design later on. So for our checkerboard, we want to loop over each row of the board and assign values to each cell in that row. Because we're working in two dimensions, we need two for-loops: one to iterate over rows and the other to iterate over each cell in the row.

That's exactly what this code does:
```
var rows = [];
for (var i = 0; i < 5; i++) {   // iterates over each row
  var row = [];
  for (var j = 0; j < 5; j++) { // iterates over each cell in row
    // ...
  }
}
```
The first loop iterates over each row. A new empty array called `row` is created that will hold the contents of that particular row. Then another loop is called which will iterate over each cell in that row.

Inside the inner for-loop, we test a condition with the if-statement, and push something to the row array depending on the outcome of the conditional statement. In this code, our two-dimensional iteration occurs where `i` represents our x-axis (rows) and `j` represents our y-axis (columns). A checkerboard is built on the concept that if we add a cell's row and column index and the sum is even, that space/cell will be colored ("##") and if it is odd, that space/cell will be white ("\__"). We test whether the row-and-column-index sum is even or odd by dividing it by two and testing whether the remainder is 0.

If the sum of these indexes is even, we do this:

`row.push(new TextCell("##"));`

and if it's odd, we do this:

`row.push(new TextCell("__"))`.

These expressions are exactly the same except for the text that is passed as a parameter to `TextCell`, so lets try to understand what it does.

`TextCell` is a constructor function that is defined like this:
```
function TextCell(text) {
  this.text = text.split("\n");
}
```
Let's look at what `String.prototype.split` does. According to [MDN:Split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split), split operates on a string of text by taking an optional separator as its argument, splitting the text at every occurrence of that separator, and returning an array containing each separated chunk of text. If the separator that is passed does not occur in the string or no separator is passed in, split returns an array which contains only one element: the entire string that was passed in. A few examples will further illustrate the functionality of `split()`:

* `"I am a sentence".split(); //-> [ "I am a sentence" ]`
* `"I am a sentence".split("z"); //-> [ "I am a sentence" ]`
* `"I_am_a_sentence".split("_"); //-> [ "I", "am", "a", "sentence" ]`
* `"12".split("\n"); //-> [ "12" ]`
* `"12\n34".split("\n"); //-> [ "12", "34" ]`

So the `TextCell` constructor takes the string that is passed to it and if a `\n` (newline character) appears anywhere in the string it splits the string at each occurrence of `\n`. In the case of our checkerboard we can see that only two strings are being passed to the `TextCell` constructor: "##" and "\__". Neither of these strings contains a newline character, so return value of `split()` will either be `[ "##" ]` or `[ "__" ]`.

Because `TextCell` is a constructor function, calling `new` will construct a new `TextCell` __object__ that will apply `split()` to the passed argument and then assign it to the object property `text`. So the end result of calling `new TextCell("##")` is `{text: [ "##" ]}` and `new TextCell("__")` is `{text: [ "__" ]}`. Looking back at our if-statement, we can see that this value gets passed to `row.push()`.`Array.prototype.push` simply adds the value passed to it to the end of the array it is called on.

For the very first iteration, `i` is 0 and `j` is 0, therefore our conditional evaluates to true. A new `TextCell` object is created with `"##"` passed to it. This new `TextCell` object is then `push`ed onto the `row` array and our `row` array then looks like this:

`row = [ {text: [ "##" ]} ];`

For the second iteration, `i` is still 0 and `j` iterates to 1, so our conditional evaluates to false. Again we create a new `TextCell` object, this time following the `else` branch and passing "\__" as the parameter to the constructor function. Once this new object is pushed to the `row` array, it looks like this:

`row = [ {text: [ "##" ]}, {text: [ "__" ]} ];`

And so on, until the inner loop's test condition evaluates to false. At this point, we call `rows.push(row)`. This will push our completed `row` array onto the `rows` array. At this point, the outer for-loop will iterate to 1 and this entire process will start over again with a new `row` array.


```
rows = [ [ {text: [ "##" ]}, {text: [ "__" ]}, {text: [ "##" ]}, ... ],
         [ {text: [ "__" ]}, {text: [ "##" ]}, {text: [ "__" ]}, ... ],
         [ {text: [ "##" ]}, {text: [ "__" ]}, {text: [ "##" ]}, ... ],
         [ {text: [ "__" ]}, {text: [ "##" ]}, {text: [ "__" ]}, ... ],
         [ {text: [ "##" ]}, {text: [ "__" ]}, {text: [ "##" ]}, ... ] ];
```
Phew! Now we finally have our array input to pass to the `drawTable` function, which means...we're just getting started!

####Drawing the Table

__Note:__ The remainder of this discussion will occur inside the `drawTable()` function. When we step away to examine function calls that occur inside `drawTable`, the discussion will appear under a header in the format __drawTable() -> otherFunctionCall()__. This format will remind us that we're still inside `drawTable`, and it conceptually simulates the way the JavaScript compiler's stack trace works.

If you recall, the call we make to draw our table is `console.log(drawTable(rows));`. We've built our `rows` array, so now we pass it as a parameter to the `drawTable()` function. Let's examine the code for `drawTable` in detail now. The full code for `drawTable` looks like this:

```
function drawTable(rows) {
  var heights = rowHeights(rows);
  var widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    return blocks.map(function(block) {
      return block[lineNo];
    }).join(" ");
  }

  function drawRow(row, rowNum) {
    var blocks = row.map(function(cell, colNum) {
      return cell.draw(widths[colNum], heights[rowNum]);
    });
    return blocks[0].map(function(_, lineNo) {
      return drawLine(blocks, lineNo);
    }).join("\n");
  }
  return rows.map(drawRow).join("\n");
}
```
Inside `drawTable()` we start by defining two variables: `heights` and `widths`. For each variable, we call the functions `rowHeights()` and `colWidths()` respectively, passing our `rows` array to each. The results of calling these functions on the `rows` array will then be assigned to each variable.

####drawTable() -> rowHeights()
```
function rowHeights(rows) {
  return rows.map(function(row) {
    return row.reduce(function(max, cell) {
      return Math.max(max, cell.minHeight());
    }, 0);
  });
}
```
This is tough. First of all, it requires a good understanding of the `map()` and `reduce()` functions. If you don't understand how these functions work, I'd strongly urge you to go back to _Eloquent JavaScript_ chapter 5, read the chapter and work the exercises, over and over and over until you really get it. If you attempt to keep reading without grasping the way these higher-order functions work, chances are you'll be pretty lost. (It's a good idea to have a solid understanding of how callback functions work as well.)

`Array.prototype.map` is called _on_ an existing array and returns a _new_ array whose values have been transformed by a callback function. The callback function is passed as a parameter to `map`. The callback function itself can take three parameters, but we will only concern ourselves with two in this discussion: [1] the current element of the array, and [2] the index of the current element of the array. (For more details, see [MDN:Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)). With that in mind, let's look at the first line of `rowHeights`: `rows.map( callback );`.

The first thing to note is that we are calling the `map` function on the `rows` array we created earlier. The callback function is going to do _something_ to the `rows` array and then __return a new array__. Its important to understand this: `map` does not make changes to the original `rows` array in place. The transformations that are made inside the callback function are `push`ed onto a new array and returned, maintaining the original array on which `map` was called.

What kind of transformation are we applying to `rows`? The callback function that is passed into `map` is an _anonymous function_ and looks like this:

```
function(row) {
  return row.reduce(function(max, cell) {
    return Math.max(max, cell.minHeight());
  }, 0);
}
```

The `row` parameter that we pass to the anonymous callback function is essentially an iterator (like `i` often is in a for-loop) and holds the value of one row at a time (or, alternately, one row sub-array of the `rows` array). Recall from earlier than one row of `rows` looks something like

```
row = [ {text: [ "##" ]}, {text: [ "__" ]}, {text: [ "##" ]}, {text: [ "__" ]}, {text: [ "##" ]} ]
```

For each iteration of `map`, we store one of these `rows` into the `row` variable for use inside the callback function.

Inside the body of the callback function, we have `row.reduce();`. `Array.prototype.reduce` is called, like `map`, on an array, but `reduce` operates on each element of the array _in some way_ in order to reduce the array to a single value. Like `map`, `reduce` takes a callback function whose body will operate on the array's elements to reduce them to a single value. `reduce` can optionally take a second argument, which we can pass if we want to set an initial value for the accumulator argument to our callback function. In this case, we pass an anonymous function as a callback to `reduce` and we pass an initial accumulator value of 0:

```
row.reduce(callback, 0);
```

The callback function can take up to four arguments, but we will concern ourselves right now with only two: [1] an accumulator, which is the thus-far-accumulated value from the last iteration of `reduce` or, if passed to `reduce`, an initial value to use on the callback's first iteration; and [2] the current element being processed in the array. So, the callback we pass to `reduce` looks like this:

```
function(max, cell) {
  return Math.max(max, cell.minHeight());
}
```

The `max` parameter passed to the callback is initially set to 0 (since we pass a second parameter to `reduce`) and will be set on each subsequent iteration to the accumulator value of the previous iteration. The `cell` parameter represents one cell of the `row` array. In this case, it will be a `TextCell` object that looks something like `{text: [ "##" ]}`.

Inside the body of the callback function, we call `Math.max()`, a standard JavaScript function in the Math library that takes two or more numbers (or expressions that evaluate to or can be coerced to numbers) and returns the largest of the numbers. In this case, we're passing `max` (our accumulator value) and an expression: `cell.minHeight()`.

####drawTable() -> rowHeights() -> minHeight()
```
TextCell.prototype.minHeight = function() {
  return this.text.length;
};
```

`minHeight` is afunction that is defined for all `TextCell` objects, and, as we just stated, on each iteration of `reduce` an individual `TextCell` in a `row` is evaluated. `minHeight` is pretty self-explanatory: it looks for the `text` property of the current `cell` and returns the length of the `text` value. In the case of our checkerboard, the `text` property for all of our `TextCell` objects each hold only one array each (e.g., `{ text: [ "\__" ]}` ), so the length returned by `minHeight` will always be 1 for our checkerboard.

Pay close attention here! We aren't getting the length of the bare string itself (e.g., `"##".length`). We are getting the length of the value held in the `text` property which is an array (e.g., `["##"].length`). This is a very subtle difference; look over it carefully until you're sure you get it.

####drawTable() -> rowHeights() <-
Now that we have a basis for understanding what `map` and `reduce` do within our `rowHeights` function, lets start from the inside and work backward to find the final value that is returned from our call to `rowHeights`.

One of the easiest ways I've found to understand nested iterative higher-order functions like `map`, `reduce`, and `filter` is to think of them in my mind as for-loops (like we saw earlier when we built the `rows` array initially). Think of each call to one of these functions as a for loop:

```
// Assume a `rows` array exists in the same scope
for (var row = 0; row < rows.length; row++) { //= rows.map(function(row) {...})
  for (var cell = 0; cell < row.length; cell++) { //= row.reduce(function(max, cell))
    ...etc...
  }
}
```

Obviously this doesn't address the _actual_ functionality of `map` (transforming an array) or `reduce` (accumulating an array into one value), but conceptually, it might help you work through the code if you mentally map it this way.

Since we're going to work through `rowHeights` now from the inside out, lets keep in mind that we're iterating inside two loops: `map` is iterating over the `rows` array, and `reduce` is iterating over each `row` individually.

As we saw inside `minHeight`, the return value for each iteration of `reduce` will be a length of 1. So the first time `reduce` iterates, `max` is 0 and `cell.minHeight()` is 1, so `Math.max(0, 1)` returns 1 which is set as `max` for the next iteration. Once we've iterated over the entire row, the length of the longest `TextCell` `text` property value is 1, so that value is returned to `map`. (Remember, `map` will collect all the transformations on the original array and return a new array, so after the first row is evaluated, `map`s new array looks like `[1]`).

`map` iterates to the next row of the array, where `reduce` will iterate over each `NewCell` object, again calling `minHeight` and reducing each cell in the row to the length of the longest `text` value. It should come as no surprise that for each of the five rows in the `rows` array, the longest length that's returned from `Math.max` and subsequently from `reduce` will be 1.

Through this process, `map` has been accumulating the array transformation values for each row of the `rows` array; once all rows are iterated, `map` returns its array, which will be [1, 1, 1, 1, 1]. This value is returned to the `drawTable` function and stored as the value for the `heights` variable.

```
function drawTable(rows) {
  var heights = [1, 1, 1, 1, 1];

  ...etc...
}
```

####drawTable() <-
Back to the `drawTable` function, we next evaluate the expression `colWidths(rows)` and assign its result to the `widths` variable:

```
function drawTable(rows) {
  ...etc...
  var widths = colWidths(rows);

  ...etc...
}
```

####drawTable -> colWidths()

```
function colWidths(rows) {
  return rows[0].map(function(_, i) {
    return rows.reduce(function(max, row) {
      return Math.max(max, row[i].minWidth());
    }, 0);
  });
}
```
The overall structure of this function is very similar to the `rowHeights` function we just walked through. With just a quick glance, we can see that `colWidths` also calls a `map` function, which calls a `reduce` function, which contains a `Math.max` function call. So just like with `rowHeights`, we can expect to be iterating a loop within a loop and return some sort of array similar to the [1, 1, 1, 1, 1] array that we just assigned to the `heights` variable.

`colWidths` does contain some notable differences, though, and that's where things get slightly more complicated. Instead of calling `map` on the entire `rows` array like we did before, this time, we call `rows[0].map()`. In case you've forgotten, let me reiterate (pun intended!) what `rows[0]` looks like:

```
rows[0] = [ {text: [ "##" ]}, {text: [ "__" ]}, {text: [ "##" ]}, {text: [ "__" ]}, {text: [ "##" ]} ]
```

So, we're just going to iterate over the first row with `map`, which will eventually returned a transformed array. __Note:__ The new array returned by `map` will always have the same number of elements as the original array it was called on, so even at this point, we can make an educated guess that `map` will return an array that has five elements.

As we've already seen, `Array.prototype.map` takes a callback function that takes an argument for the currently-iterated element of the array, and the index of that element. Here, the callback function passed to `map` looks like this:
```
rows[0].map(function(_, i) {
  ...etc...
});
```
Wait, what's that underscore for?! When passing arguments to pre-defined parameters, we can use an underscore to indicate that we don't care about using that argument's value inside the function. In this case, we don't care about the value of the currently-iterated element of `row[0]`; we only care about the index (`i`) of the current element.

Next, we're going to iterate over the entire `rows` array (not just `rows[0]` like we do in the outer `map` method). Again, we set the `reduce` method's initial accumulator value to 0 and pass one row of `rows` at a time to the callback function.

For each row, we return the result of evaluating which value is larger: the current `max` accumulator value or the result of evaluating `row[i].minWidth()`. Remember, we passed `i` as a value to the `map` function just a minute ago, so this value is the index of our current item in `rows[0]`, not the index of the current row of the `rows` array.

Let's step back a moment and look at the bigger picture here: we're trying to figure out the width of the largest string in each column of our table, so we can make enough space for all our data. This is why we just iterate over `rows[0]` for the `map` function: each element of this row represents one total _column_ of our table. But, we have to iterate over all the rows in the array because each cell in a particular column falls in a different row. This is where `rows[i]` comes in. Let's look at it visually:

<pre>
rows =

i =>      0   1   2   3   4
rows[0]
rows[1]
rows[2]
rows[3]
rows[4]
</pre>

Say we're evaluating every element of `i = 2`; we have to iterate over __all__ of every row, but we only pick out the elements in column 2 by using row[i]. This is complicated, but hopefully its starting to make sense. Let's go back to our `Math.max` function.

One of the parameters we pass to `Math.max` is `row[i].minWidth()`. We already know that `row[i]` represents a single cell in `row` at column `i`, so we'll step through and see what `minWidth` does.

####drawTable -> colWidths() -> minWidth()
Like `minHeight`, `minWidth` is a function defined on `TextCell.prototype`, so all `TextCell` objects have access to it.

```
TextCell.prototype.minWidth = function() {
  return this.text.reduce(function(width, line) {
    return Math.max(width, line.length);
    });
}
```
`this` is the current `TextCell` object that `minWidth` is operating on, so `this.text` is either ["##"] or ["\__"]. Remember that `reduce` operates on the values contained _inside_ an array, even if that array (like in this case) only contains one element. So the inner text "##" or "\__" is passed as the `line` variable to the callback function for each iteration of `reduce`.

We set our accumulator value `width` to an initial value of 0 and call `Math.max` to determine whether the width of our current `line` is larger than the maximum that we've found so far. In this case, since all text values are the same length, `minWidth` will always return a value of 2.

####drawTable() -> colWidths() <-
Similarly to `rowHeights` earlier, we compare this returned value of 2 with our current accumulator value and return the higher of the two. Because we are inside the `reduce` function, we return a column width of 2 for each iteration through our entire `rows` array, and those values--one corresponding to each element of `rows[0]` are then returned from the `map` function. So once `colWidths` completes itself, it returns an array looking like [2, 2, 2, 2, 2]. This array value gets returned to the `drawTable` function, where it's stored in the `widths` variable:

```
function drawTable(rows) {
  var heights = [1, 1, 1, 1, 1];
  var widths = [2, 2, 2, 2, 2];

  ...etc...
}
```

####drawTable <-

The next line to concern ourselves with is the very last line of `drawTable`:
```
return rows.map(drawRow).join("\n");
```
We'll first start by examining `rows.map(drawRow)`. I want to note a few things before we dive in though. First of all, we're calling the `map` function on the `rows` array, which means we can expect our final return value from `map` to be an array containing five elements (since `rows` has five `row` elements in it).

Secondly, we are going to be stepping through into the `drawRow` function in just a moment, but its important to keep in mind as we do that that __we are still inside the `map` iterative function__. We can anticipate, then, that _whatever_ `drawRow` ends up doing inside itself, it will happen for each iteration of `map` on the `rows` array.
