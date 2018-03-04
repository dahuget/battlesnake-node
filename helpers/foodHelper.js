// find closest food point to head location
function findFood(data) {
  var foodLocation = data.food.data
  var head = snakeHeadHelper.snakeHead(data.you)
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
  } else {
    return false;
  }
}
exports = {findFood: findFood, needFood: needFood}