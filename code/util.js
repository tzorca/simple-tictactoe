// Sourced from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// This example returns a random integer between the specified values. The value is no lower than min (or the next integer greater than min if min isn't an integer), and is less than (but not equal to) max.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Sourced from http://stackoverflow.com/a/14832662
Array.prototype.allValuesSame = function() {
  for(var i = 1; i < this.length; i++)
  {
    if(this[i] !== this[0]) {
      return false;
    }
  }
  return true;
}