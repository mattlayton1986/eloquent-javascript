function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(vector) {
  return new Vector((this.x + vector.x), (this.y + vector.y));
};

Vector.prototype.minus = function(vector) {
  return new Vector((this.x - vector.x), (this.y - vector.y));
};

Object.defineProperty(Vector, "length", {
  get: function() {
    return Math.abs(Math.sqrt(this.x * this.x + this.y * this.y));
  }
});
