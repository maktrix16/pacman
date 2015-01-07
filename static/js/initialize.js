//Create New World
var world=new World();
world.createItems(Brick,Coin,Blank);
var count_pacman=1;
var count_ghost=1;
var P1=world.createPacman(Pacman,1,'P1'); //set Player 1 to be Pacman 1
world.createGhost(Ghost,1);

// Create new Pacman / Ghosts
$('#pacman-btn').click(function(){
  if (world.pacmans.length>1){
    alert('Maximum no. of Pacmans already exists in this world!');
  }
  else if (world.pacmans.length==1){
    count_pacman++;
    if (world.pacmans[0].player=='P1') {
      world.createPacman(Pacman,count_pacman,'P2');
    }
    else world.createPacman(Pacman,count_pacman,'P1');
  }
  else {  //case where no more pacman exists in the world
    count_pacman++;
    world.createPacman(Pacman,count_pacman,'P1');        
  }

});
$('#ghost-btn').click(function(){
  count_ghost++;
  world.createGhost(Ghost,count_ghost);       
});
