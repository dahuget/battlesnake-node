function avoidWalls(head, height, width, moveOptions) {
  if(head.x -1 < 0){
    //cant go left
    moveOptions[0] = false
  }
  if(head.x +1 >= width){
    //cant go right
    moveOptions[1] = false
  }
  if(head.y -1 < 0){
    //cant go up
    moveOptions[2] = false
  }
  if(head.y +1 >= height){
    //cant go down
    moveOptions[3] = false
  }
}
exports.avoidWalls = avoidWalls;