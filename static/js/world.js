// The actual world
function World(){
  this.items=[];
  // this.creatures=[];
  this.pacmans=[];
  this.ghosts=[];
  this.removeCoin=null;
  this.map=[
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,2,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,
    0,1,0,0,1,1,1,1,1,0,1,0,1,0,1,0,0,1,0,0,
    0,1,1,1,1,0,0,0,1,0,0,0,1,1,1,0,0,1,1,0,
    0,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,1,0,0,
    0,0,1,0,0,0,1,0,1,1,1,1,1,0,0,1,0,1,1,0,
    0,1,1,1,0,0,1,1,1,0,1,0,1,1,1,1,1,1,0,0,
    0,1,0,1,1,0,1,0,1,0,0,0,0,1,0,0,0,1,0,0,
    0,1,1,0,1,1,1,1,0,2,2,2,0,1,0,1,1,1,1,0,
    0,0,1,0,0,1,0,1,0,2,2,2,0,1,1,0,1,0,1,0,
    0,1,1,1,1,1,0,1,0,0,2,0,0,0,1,1,1,1,1,0,
    0,1,0,0,1,0,0,1,1,1,1,1,0,0,1,0,1,0,1,0,
    0,1,1,0,1,0,0,0,1,0,0,1,1,1,1,0,0,0,1,0,
    0,0,1,1,1,1,1,1,1,0,0,1,0,1,1,1,1,1,1,0,
    0,0,0,0,1,0,0,1,0,0,1,1,1,1,0,0,0,1,0,0,
    0,1,1,1,1,1,0,1,0,0,1,0,1,0,1,0,1,1,1,0,
    0,1,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,
    0,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,
    0,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,2,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
  ];

  // Methods to create objects within the world
  this.createItems=function(){
    for (var i=0; i<this.map.length; i++){
      if (this.map[i]==0) var item = new Brick(i);
      if (this.map[i]==1) var item = new Coin(i);
      if (this.map[i]==2) var item = new Blank(i);
      this.items.push(item);              
    }        
  }
  this.createPacman=function(id,player){
    if (player=='P1') var pacman=new Pacman(id,player,1,1);
    else var pacman=new Pacman(id,player,18,18)
    this.pacmans.push(pacman);
    $('#scoreboard').append(
      "<div id='pacman"+id+"-score' class='pacman-score'><p>Pacman "+id+"'s Score: 0</p></div>"
    );
    $('scoreboard').append(
      "<div id='pacman"+id+"-score' class='pacman-score'><p>Pacman "+id+"'s Score: 0</p></div>"
    );
  }
  this.createGhost=function(id){
    var ghost=new Ghost(id);
    this.ghosts.push(ghost);
  }
  // Method to upate the world
  this.updateWorld=function(){
    //Change coin into blank if coin is eated by Pacman 
    if (world.removeCoin !=null){
      var index=world.removeCoin;
      this.items[index]=new Blank(index);
      document.getElementById('item'+index).remove();
      this.items[index].construct_html(index,'blank');
      world.removeCoin=null;         
    }

    //Re-draw all creatures
    for (var i=0; i<this.pacmans.length;i++){
      document.getElementById(this.pacmans[i].type+this.pacmans[i].id).remove();
      this.pacmans[i].construct_html(this.pacmans[i]);
    }
    for (var i=0; i<this.ghosts.length;i++){
      document.getElementById(this.ghosts[i].type+this.ghosts[i].id).remove();
      this.ghosts[i].construct_html(this.ghosts[i]);
    }
  }

  this.getItemByCoor=function(x,y){
    return this.items[x+20*y];
  }

  this.getIndexByCoor=function(x,y){
    return x+20*y;
  }

  // Initialize
  this.createItems();
}
