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

var dragmove = function(d, i){
  counter += 1;
  updateScore();
  highScore();
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
  d3.selectAll('rect').data(storedEnemy).attr('x', function(item){
    if(this.item === x){
      console.log('collision');
    }
  }).attr('y', function(item){
    if(this.item === y){
      console.log('collision');
    }
  })
}

var drag = d3.behavior.drag().on('drag', dragmove);


var user = gameBoard.append('circle')
.attr('cx', 15)
.attr('cy', 15)
.attr('r', 15)
.style('fill', 'white')
.call(drag);



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

var moveEnemies = function(){
  gameBoard.selectAll('rect')
  .transition()
  .duration(3000)
  .attr('x', function(d){ return Math.floor(Math.random() * 700)})
  .attr('y', function(d){ return Math.floor(Math.random() * 700)})
  .style('fill', function(d){ return 'green'})
}
moveEnemies();
setInterval(moveEnemies, 4000);

