var express = require('express')
var router  = express.Router()

var snakeHelpers = require('../helpers/snakeHelpers')

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
}

function pickMove(data, moveOptions) {
  var head = snakeHelpers.snakeHead(data.you);
  var wallHeight = data.height;
  var wallWidth = data.width;

  avoidWalls(head, wallHeight, wallWidth, moveOptions)
  avoidSelf(data, head, moveOptions)
  avoidSenks(data, head, moveOptions)

  for (i=0; i < moveOptions.length; i++) {
    if (moveOptions[i] === true) {
      return i
    }
  }

  //moveOptions = moveOptions.filter(Boolean);
  //var index = Math.floor(Math.random() * moveOptions.length);

}

// find closest food point to head location
function findFood(data) {
  var foodLocation = data.food.data
  var head = snakeHead(data.you)
  var dist = []
  if (foodLocation.length >= 1){
    // go through all food on board
    for (var i = 0; i < foodLocation.length; i++){
        var x = Math.abs(head.x - foodLocation[i].x)
        var y = Math.abs(head.y - foodLocation[i].y)
        dist[i] = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    }
    // index of minimum distance food
    var min = dist.indexOf(Math.min(...dist))
    return foodLocation[min]
  }
  return foodLocation[0]
}

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

  // Response data
  var data = {
    color: "#FFD957",
    secondary_color: "#D15BFE",
    head_url: "http://placecage.com/c/100/100",
    taunt: "OH GOD NOT THE BEES",
    head_type: "tongue",
    tail_type: "skinny"
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
    head: snakeHelpers.snakeHead(req.body.you),
    nearestFood: findFood(req.body)
  }

  return res.json(data)
})



module.exports = router
