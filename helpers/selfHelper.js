function avoidSelf(data, head, moveOptions) {
  var body = data.you.body.data
  for (i = 1; i < body.length; i++){
    if(head.x -1 == body[i].x && head.y == body[i].y){
      //cant go left
      moveOptions[0] = false
    }
    if(head.x +1 == body[i].x && head.y == body[i].y){
      //cant go right
      moveOptions[1] = false
    }
    if(head.x == body[i].x && head.y -1 == body[i].y){
      //cant go up
      moveOptions[2] = false
    }
    if(head.x == body[i].x && head.y +1 == body[i].y){
      //cant go down
      moveOptions[3] = false
    }
  }
}
exports.avoidSelf = avoidSelf;