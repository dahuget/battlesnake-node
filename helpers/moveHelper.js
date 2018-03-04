function pickMove(data, moveOptions) {
  var head = snakeHeadHelper.snakeHead(data.you);
  var wallHeight = data.height;
  var wallWidth = data.width;

  avoidWalls(head, wallHeight, wallWidth, moveOptions)
  avoidSelf(data, head, moveOptions)
  avoidSenks(data, head, moveOptions)
  killOrAvoid(data, head, moveOptions)

  for (i=0; i < moveOptions.length; i++) {
    if (moveOptions[i] === true) {
      return i
    }
  }

  //moveOptions = moveOptions.filter(Boolean);
  //var index = Math.floor(Math.random() * moveOptions.length);

}