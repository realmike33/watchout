var enemyNum = 5;

var rotTween = function(){
  var i = d3.interpolate(0, 360);
  return function(t){
    return "rotate(" + i(t) + ", 100, 100)";
  };
};

var gameBoard = d3.select('body').append('svg');


var dragmove = function(d, i){
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
}

var drag = d3.behavior.drag().on('drag', dragmove);


var user = gameBoard.append('circle')
.attr('cx', 25)
.attr('cy', 25)
.attr('r', 25)
.style('fill', 'blue')
.call(drag);



var enemy = function(){
  for(var i = 0; i < enemyNum; i++){
    gameBoard.append('rect', function(d){return d;})
    .attr("x",Math.floor(Math.random() * 500))
    .attr("y",Math.floor(Math.random() * 300))
    .attr("width",50)
    .attr("height",50)
    .style("fill","orange");
  }
};
enemy();

d3.select('button').on('click', function(){location.reload();})
