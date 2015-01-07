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
  this.createItems=function(item0, item1, item2){
    for (var i=0; i<this.map.length; i++){
      if (this.map[i]==0) var item = new item0(i);
      if (this.map[i]==1) var item = new item1(i);
      if (this.map[i]==2) var item = new item2(i);
      this.items.push(item);         
    }        
  }
  this.createPacman=function(pacman_class,id,player){
    if (player=='P1') var pacman=new pacman_class(id,player,1,1);
    else var pacman=new pacman_class(id,player,18,18)
    this.pacmans.push(pacman);
    $('#scoreboard').append(
      "<div id='pacman"+id+"-score' class='pacman-score'><p>Pacman "+id+"'s Score: 0</p></div>"
    );
    $('scoreboard').append(
      "<div id='pacman"+id+"-score' class='pacman-score'><p>Pacman "+id+"'s Score: 0</p></div>"
    );
  }
  this.createGhost=function(ghost_class,id){
    var ghost=new ghost_class(id);
    this.ghosts.push(ghost);
  }
  // Method to upate the world
  this.updateWorld=function(blank_class){
    //Change coin into blank if coin is eated by Pacman 
    if (this.removeCoin !=null){
      var index=this.removeCoin;
      this.items[index]=new blank_class(index);
      document.getElementById('item'+index).remove();
      this.items[index].construct_html(index,'blank');
      this.removeCoin=null;         
    }

    //Re-draw all creatures
    for (var i=0; i<this.pacmans.length;i++){
      $("#"+this.pacmans[i].type+this.pacmans[i].id).remove();
      this.pacmans[i].construct_html(this.pacmans[i]);
    }
    for (var i=0; i<this.ghosts.length;i++){
      $("#"+this.ghosts[i].type+this.ghosts[i].id).remove();
      this.ghosts[i].construct_html(this.ghosts[i]);
    }
  }

  this.getItemByCoor=function(x,y){
    return this.items[x+20*y];
  }

  this.getIndexByCoor=function(x,y){
    return x+20*y;
  }
}

// Items: Brick, Coin, Blank
function Item(index,type,can_pass){
  this.index=index;
  this.type=type;
  this.can_pass=can_pass;   //attribute for allowing object to pacman / ghost to pass or not
  this.construct_html(this.index,this.type); //initialize
}
Item.prototype.construct_html=function(index,type_name){
    $('#container-main').append(
      "<div id='item"+this.index+"' class='"+type_name+"' style='top: "+Math.floor(index/20)*25
      +"px; left: "+Math.floor(index%20)*25+"px'></div>"
      );
}
function Brick(index){
  Item.call(this,index,'brick',false);
};
Brick.prototype=new Item();

function Coin(index){
  Item.call(this,index,'coin',true);
};
Coin.prototype=new Item();

function Blank(index){
  Item.call(this,index,'blank',true);
};
Blank.prototype=new Item();

