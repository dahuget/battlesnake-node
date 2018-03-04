function avoidSenks(data, head, moveOptions) {
  var snakes = data.snakes.data
  for(i = 0; i < snakes.length; i++){
    var snek = snakes[i].body.data;
    for(j = 0; j < snek.length; j++){
      if(head.x -1 == snek[j].x && head.y == snek[j].y){
        //cant go left
        moveOptions[0] = false
      }
      if(head.x +1 == snek[j].x && head.y == snek[j].y){
        //cant go right
        moveOptions[1] = false
      }
      if(head.x == snek[j].x && head.y -1 == snek[j].y){
        //cant go up
        moveOptions[2] = false
      }
      if(head.x == snek[j].x && head.y +1 == snek[j].y){
        //cant go down
        moveOptions[3] = false
      }
    }
  }
}
exports.avoidSenks = avoidSenks;