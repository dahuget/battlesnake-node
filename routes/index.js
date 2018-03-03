var express = require('express')
var router  = express.Router()

function snakeHead(snake) {
  return snake.body.data[0]; // {"x": 8, "y": 15 }
}

function avoidWalls(head, height, width, moves) {
  if(head.x -1 < 0){
    //cant go left
    moves[0] = false
  }
  if(head.x +1 >= width){
    //cant fo right
    moves[1] = false
  }
  if(head.y -1 < 0){
    //cant go up
    moves[2] = false
  }
  if(head.y +1 >= height){
    //cant go down
    moves[3] = false
  }
}


function pickMove(data, moveOptions) {
  var head = snakeHead(data.you);
  var wallHeight = data.height;
  var wallWidth = data.width;

  avoidWalls(head, wallHeight, wallWidth, moveOptions)


  for (i=0; i < moveOptions.length; i++) {
    if (moveOptions[i] === true) {
      return i
    }
  }
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
