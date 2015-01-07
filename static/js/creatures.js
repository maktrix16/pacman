// Creatures: Pacman, Ghost
function Creature(id,type,x,y){
  this.id=id;
  this.type=type;
  this.x=x;
  this.y=y;
  this.transit=false;
  this.direction=null;
}
Creature.prototype.construct_html=function(creature){
  if (!this.transit) var classStyle = this.type+"-"+this.direction+"1";
  else var classStyle = this.type+"-"+this.direction+"2";
  // document.getElementById('container-main').innerHTML+=
  //   "<div id='"+creature.type+creature.id+"' class='"+classStyle+"' style='top: "+creature.y*25
  //   +"px; left: "+creature.x*25+"px'></div>";
  $('#container-main').append(
    "<div id='"+creature.type+creature.id+"' class='"+classStyle+"' style='top: "+creature.y*25
    +"px; left: "+creature.x*25+"px'></div>"
  );
}
Creature.prototype.checkWall=function(world,direction){
  if (direction=='left')
    return !world.getItemByCoor(Math.ceil(this.x)-1,this.y).can_pass;
  else if (direction=='right')
    return !world.getItemByCoor(Math.floor(this.x)+1,this.y).can_pass;
  else if (direction=='up')
    return !world.getItemByCoor(this.x,Math.ceil(this.y)-1).can_pass;
  else if (direction=='down')
    return !world.getItemByCoor(this.x,Math.floor(this.y)+1).can_pass;
}
Creature.prototype.checkItemType=function(world,direction){
  if (direction=='left')
    return world.getItemByCoor(Math.ceil(this.x)-1,this.y).type;
  else if (direction=='right')
    return world.getItemByCoor(Math.floor(this.x)+1,this.y).type;
  else if (direction=='up')
    return world.getItemByCoor(this.x,Math.ceil(this.y)-1).type;
  else if (direction=='down')
    return world.getItemByCoor(this.x,Math.floor(this.y)+1).type;
}
Creature.prototype.move=function(world,direction){
  if (!this.checkWall(world,direction)){
    if (direction=='left'){
      this.x-=.5; 
      if(this.transit) this.transit=false;
      else this.transit=true;
      // console.log("x:",this.x,"y:",this.y);
      this.direction='left';
    }
    else if (direction=='right'){
      this.x+=.5; 
      if(this.transit) this.transit=false;
      else this.transit=true;
      // console.log("x:",this.x,"y:",this.y);
      this.direction='right';
    }
    else if (direction=='up'){
      this.y-=.5; 
      if(this.transit) this.transit=false;
      else this.transit=true;
      // console.log("x:",this.x,"y:",this.y);
      this.direction='up';
    }
    else if (direction=='down'){
      this.y+=.5; 
      if(this.transit) this.transit=false;
      else this.transit=true;
      // console.log("x:",this.x,"y:",this.y);
      this.direction='down';
    }
  }
}

function Pacman(id,player,x,y){
  Creature.call(this,id,'pacman',x,y);
  this.player=player; 
  this.direction='right';
  this.score=0;
  this.construct_html(this);    //initialize
}
Pacman.prototype=new Creature();
Pacman.prototype.eatCoin=function(world){
  if (!this.transit){ //only eat coin when not in transit
    if (world.getItemByCoor(Math.round(this.x),Math.round(this.y)).type=='coin'){
      this.score+=100;
      world.removeCoin=world.getIndexByCoor(Math.round(this.x),Math.round(this.y));
      $('#pacman'+this.id+'-score').html("");
      $('#pacman'+this.id+'-score').append("Pacman "+this.id+"'s Score: "+this.score);
    }
  }
}

function Ghost(id){
  Creature.call(this,id,'ghost',9,8);   
  this.paths=['left','right','up','down'];
  this.direction='down';
  this.mode='random';
  this.construct_html(this);    //initialize
}
Ghost.prototype=new Creature();
Ghost.prototype.eatPacman=function(world){
  var e=0.0001;
  for (var i=0; i<world.pacmans.length;i++){
    if (Math.abs(this.x-world.pacmans[i].x)<e+0.5 
      && Math.abs(this.y-world.pacmans[i].y)<e+0.5)
    {
      // document.getElementById('scoreboard').innerHTML+="<div class='ghost-score'><p>Pacman"+world.pacmans[i].id+" is eaten by Ghost"+this.id+"</p></div>";

      // document.getElementById(world.pacmans[i].type+world.pacmans[i].id).remove();
      $('#scoreboard').append("<div class='ghost-score'><p>Pacman"+world.pacmans[i].id+" is eaten by Ghost"+this.id+"</p></div>");
      $('#'+world.pacmans[i].type+world.pacmans[i].id).remove();
      world.pacmans.splice(i,1);
    }
  }
}
Ghost.prototype.opposite=function(direction){
  if (direction=='left') return 'right';
  else if (direction=='down') return 'up';
  else if (direction=='right') return 'left';
  else if (direction=='up') return 'down';
}
Ghost.prototype.antiClockwise=function(direction){
  if (direction=='left') return 'down';
  else if (direction=='down') return 'right';
  else if (direction=='right') return 'up';
  else if (direction=='up') return 'left';
}
Ghost.prototype.clockwise=function(direction){
  if (direction=='left') return 'up';
  else if (direction=='up') return 'right';
  else if (direction=='right') return 'down';
  else if (direction=='down') return 'left';
}
Ghost.prototype.updatePaths=function(world,direction){
  var new_paths=[];

  // console.log('Prior: Paths:',new_paths,'Direction',direction);
  if (!this.checkWall(world,this.direction)) 
    new_paths.push(this.direction); 
  if (!this.checkWall(world,this.antiClockwise(this.direction))) 
    new_paths.push(this.antiClockwise(this.direction));
  if (!this. checkWall(world,this.clockwise(this.direction))) 
    new_paths.push(this.clockwise(this.direction));
  if (new_paths.length==0) 
    new_paths.push(this.opposite(this.direction));

  // console.log('Post: Paths:',new_paths,'Direction',direction);

    this.paths=new_paths;
  // console.log("updatePaths:",paths);
}
Ghost.prototype.randomWalk=function(world){
  // console.log('Prior: Direction:',this.direction,'Paths:',this.paths)
  if (!this.transit){
    this.updatePaths(world,this.direction);
    this.direction=this.paths[Math.floor(Math.random()*this.paths.length)];
  }
  // console.log('Post: Direction:',this.direction,'Paths:',this.paths)
  this.move(world,this.direction);
}
Ghost.prototype.killMode=function(world){
  if (world.pacmans.length==0)  this.randomWalk(world);
  else{
    // console.log('Prior: Direction:',this.direction,'Paths:',this.paths)
    if (!this.transit){
      // define private functions
      var calcDiag=function(x1,y1,x2,y2){
        return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
      }
      var getMinIndex=function(array){
        var min_i=0;
        var min_val=array[0];
        for (var i=1;i<array.length;i++){
          if (array[i]<min_val){
            min_i=i;
            min_val=array[i];
          }
        }
        return min_i;
      }
      //decide which pacman to go after
      if (world.pacmans.length==1)  var pacman=world.pacmans[0];
      else if (
        calcDiag(world.pacmans[0].x,world.pacmans[0].y,this.x,this.y) 
          < calcDiag(world.pacmans[1].x,world.pacmans[1].y,this.x,this.y)
      ) {var pacman=world.pacmans[0];}
      else  var pacman=world.pacmans[1]; 

      //find shortest path algorithm
      this.updatePaths(world,this.direction);
      if (this.paths.length==1)  this.direction=this.paths[0];
      // when more than one path, choose path with shortest diagonal distance
      else if (this.paths.length>1){
        var diag_dist=[];
        for (var i=0; i<this.paths.length;i++){
          if (this.paths[i]=='left')  {
            diag_dist.push(calcDiag(pacman.x,pacman.y,this.x-1,this.y));
          }
          else if (this.paths[i]=='right'){
            diag_dist.push(calcDiag(pacman.x,pacman.y,this.x+1,this.y));              
          }
          else if (this.paths[i]=='up'){
            diag_dist.push(calcDiag(pacman.x,pacman.y,this.x,this.y-1));              
          }
          else if (this.paths[i]=='down'){
            diag_dist.push(calcDiag(pacman.x,pacman.y,this.x,this.y+1));
          }
        }
        this.direction=this.paths[getMinIndex(diag_dist)];
      }
    }
    this.move(world,this.direction);
  }
}
