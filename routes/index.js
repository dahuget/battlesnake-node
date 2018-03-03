var express = require('express')
var router  = express.Router()

function snakeHead(snake) {
  return snake.body.data[0]; // {"x": 8, "y": 15 }
}

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

function pickMove(data, moveOptions) {
  var head = snakeHead(data.you);
  var wallHeight = data.height;
  var wallWidth = data.width;

  console.log(moveOptions)
  avoidWalls(head, wallHeight, wallWidth, moveOptions)
  console.log(moveOptions)
  avoidSelf(data, head, moveOptions)
  console.log(moveOptions)
  avoidSenks(data, head, moveOptions)

  for (i=0; i < moveOptions.length; i++) {
    if (moveOptions[i] === true) {
      return i
    }
  }

  //moveOptions = moveOptions.filter(Boolean);
  //var index = Math.floor(Math.random() * moveOptions.length);

}

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

  // Response data
  var data = {
    color: '#FFD957',
    name: 'Node Snake',
    head_url: 'http://www.placecage.com/c/200/200', // optional, but encouraged!
    taunt: "Let's do thisss thang!", // optional, but encouraged!
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // NOTE: Do something here to generate your move
  // Response data

  var moveOptions = [true, true, true, true];
  var moveIndex = pickMove(req.body, moveOptions)
  var options = ['left', 'right', 'up', 'down']


  var data = {
    move: options[moveIndex], // one of: ['up','down','left','right']
    taunt: 'Outta my way, snake!!!', // optional, but encouraged!
    head: snakeHead(req.body.you)
  }

  return res.json(data)
})



module.exports = router
