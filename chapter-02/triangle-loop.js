/*

>> Assignment <<
  Write a loop that makes seven calls to `console.log` to output the following triangle:

  #
  ##
  ###
  ####
  #####
  ######
  #######

>> Pseudocode Algorithm <<
  cursor = "#"
  string = ""
  Loop 7 times
    add another cursor to current string
    log string's current state to console
  end Loop

*/

const cursor = "#";
var string = "";
for ( var i=0; i < 7; i++) {
  string += cursor;
  console.log(string);
}
