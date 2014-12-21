var gameBoard = d3.select('body').append('svg');
var counter = 0;
var high = 0;

var storedEnemy = [];

d3.select('button').on('click', function(){location.reload();})

var updateScore = function(){
  d3.select('.current').select('span').text(counter);
};

var highScore = function(){
  if(high <= counter){
    high++;
    d3.select('.high').select('span').text(counter);
  }
}

var colorChange = function(){
  var random1 = Math.floor(Math.random() * 255);
  var random2 = Math.floor(Math.random() * 255);
  var random3 = Math.floor(Math.random() * 255);
  d3.select('circle')
  .transition()
  .duration(300)
  .style("fill", function(){return d3.rgb(random1, random2, random3)})
}

setInterval(colorChange, 300);

var dragmove = function(){
  counter += 1;
  updateScore();
  highScore();
  var x = d3.event.x - user.attr('r');
  var y = d3.event.y - user.attr('r');
  d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
}


var drag = d3.behavior.drag().on('drag', dragmove);


var user = gameBoard.append('circle')
.attr('cx', 15)
.attr('cy', 15)
.attr('r', 15)
.style('fill', 'white')
.call(drag)



var enemy = function(xTime, yTime){
  var enemyNum = 20;
  var innerFunc = function(xTime, yTime){
    if(enemyNum === 0){
      return;
    }
    gameBoard.append('rect', function(d){return d;})
    .attr("x", xTime)
    .attr("y", yTime)
    .attr("width",20)
    .attr("height",20)
    .style("fill","green");
    enemyNum--;
    storedEnemy.push(1);
    innerFunc(Math.floor(Math.random()*400), Math.floor(Math.random()*400));
  }
  innerFunc(Math.floor(Math.random()*400), Math.floor(Math.random()*400))
};
enemy();

var moveEnemies = function(element){
  element
  .transition()
  .duration(3000)
  .attr('x', function(d){ return Math.floor(Math.random() * 700)})
  .attr('y', function(d){ return Math.floor(Math.random() * 700)})
  .style('fill', 'red')
  .delay(00)
  .transition()
  .duration(1000)
  .style('fill', 'green')
  .each('end', function(){
    moveEnemies(d3.select(this))
  })
}
moveEnemies(gameBoard.selectAll('rect'));

var detectCollision = function(){
  var collision = false;

  gameBoard.selectAll('rect').each(function(){
    console.log(this.offsetLeft)
    var cx = this.offsetLeft + gameBoard.attr('x');
    var cy = this.offsetTop + gameBoard.attr('y')
    var x = cx - user.attr('cx')
    var y = cy - user.attr('cy')
    if(Math.sqrt(x*x + y*y) < user.attr('r')*2){
      collision = true;
    }
  });

  if(collision){
    console.log('collide!')
  }
};
























