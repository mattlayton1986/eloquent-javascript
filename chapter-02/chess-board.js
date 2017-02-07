function chessBoard(size) {
  var string = "";
  for (var row = 1; row <= size; row++) {
    for (var square = 1; square <= size; square++) {
      if ( (row + square) % 2 === 0 ) {
        string += " ";
      } else {
        string += "#";
      }
    }
    string += "\n";
  }
  console.log(string);
}
