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

  avoidSenks(data, head, moveOptions)
  killOrAvoid(data, head, moveOptions)
  avoidSelf(data, head, moveOptions)
  avoidWalls(head, wallHeight, wallWidth, moveOptions)

  for (i=0; i < moveOptions.length; i++) {
    if (moveOptions[i] === true) {
      return i
    }
  }

  //moveOptions = moveOptions.filter(Boolean);
  //var index = Math.floor(Math.random() * moveOptions.length);

}

function findPath(head, target){
  var xMoves = target.x - head.x;
  var yMoves = target.y - head.y;
  var left = false;
  var right = false;
  var up = false;
  var down = false;
  if(xMoves < 0){
    //moving left
    left = true;
  } else  if(xMoves > 0){
    right = true;
  }
  if(yMoves < 0){
    //moving up
    up = true
  } else if(yMoves > 0){
    down = true;
  }
  var horiz = [];
  var vert = [];
  if(left){
    horiz.push('left')
  }
  if(right){
    horiz.push('right')
  }
  if(up){
    horiz.push('up')
  }
  if(down){
    horiz.push('down')
  }
  var path = horiz.concat(vert)
  return path
}

// find closest food point to head location
function findFood(data) {
  var foodLocation = data.food.data
  var head = snakeHelpers.snakeHead(data.you)
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

function needFood(data){
  var snakeHealth = data.you.health
  var wallHeight = data.height
  var wallWidth = data.width
  var dimSum = wallWidth + wallHeight

  if (snakeHealth <= dimSum) {
    return true;
  } else{
    return false;
  }

}


function killOrAvoid(data, head, moveOptions){
  var snakes = data.snakes.data
  for(i = 0; i < snakes.length; i++){
    var snek = snakes[i].body.data;
    var sX = snek[0].x
    var sY = snek[0].y
    if (
        (head.y == sY-1 || head.y == sY+1) &&
        head.x-1 == sX ||
        (head.y == sY && head.x-2 == sX)
      ) {
      if (you.length > snek.length){
        moveOptions[0] = true //go left and kill
      }
      else {
        moveOptions[0] = false //avoid
      }
    }
    if (
      (head.y == sY-1 || head.y == sY+1)
      && head.x+1 == sX ||
      (head.y == sY && head.x+2 == sX)
    ) {
      if(you.length > snek.length){
        moveOptions[1] = true //go right and kill
      }
      else {
        moveOptions[1] = false //avoid
      }
    }
    if(
      (head.x == sX-1 || head.x == sX+1)
      && head.y-1 == sY ||
      (head.x == sX && head.y-2 == sY)
    ) {
      if(you.length > snek.length){
        moveOptions[2] = true //go up and kill
      }
      else {
        moveOptions[2] = false //avoid
      }
    }
  if (
    (head.x == sX-1 || head.x == sX+1) &&
    head.y+1 == sY ||
    (head.x == sX && head.y+2 == sY)
  ) {
      if(you.length > snek.length){
        moveOptions[2] = true //go down and kill
      }
      else {
        moveOptions[2] = false //avoid
      }
    }
  }
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
  var snakeHead = snakeHelpers.snakeHead(req.body.you)
  var nearestFood = findFood(req.body)

  var needsFood = needFood(req.body)
  var move;

  if (needsFood) {
    move = findPath(snakeHead, nearestFood)[0]
  } else {
    move = options[moveIndex]
  }

  var data = {
    move: options[moveIndex], // one of: ['up','down','left','right']
    taunt: 'Outta my way, snake!!!', // optional, but encouraged!
    head: snakeHead,
    nearestFood: nearestFood,
    needsFood: needsFood,
    path: findPath(snakeHead, nearestFood)
  }

  return res.json(data)
})



module.exports = router
