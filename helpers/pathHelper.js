function findPath(head, target){
  var xMoves = target.x - head.x;
  var yMoves = target.y - head.y;
  var left = true;
  var right = true;
  var up = true;
  var down = true;
  if(xMoves < 0){
    //moving left
    right = false;
  }
  if(yMoves < 0){
    //moving up
    down = false
  }
  if(xMoves == 0){
    right = false
    left = false
  }
  if(yMoves == 0){
    up = false
    down = false
  }
  var horiz = [];
  for(i = 0; i < Math.abs(xMoves); i++){
    if(right)
      horiz.push('right')
    else if(left)
      horiz.push('left')
  }
  var vert = [];
  for(i = 0; i < Math.abs(yMoves); i++){
    if(up)
      horiz.push('up')
    else if(down)
      horiz.push('down')
  }
  var path = horiz.concat(vert)
  shuffle(path)
  return path
}
exports.findPath = findPath;