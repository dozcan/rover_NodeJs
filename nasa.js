class rover {
  constructor(defaultDirection, roverMove,x,y,name) {
    this.name = name;
    this.defaultDirection = defaultDirection;
    this.roverMove = roverMove;
    this.x = x;
    this.y = y;
  }
}

let rovers = [];
let moveOccuredIndex = 0;

rovers.push( new rover("N", ["L","M","L","M","L","M","L","M","M"],1,2,"rover1"));
rovers.push( new rover("E",  ["M","M","R","M","M","R","M","R","R","M"],3,3,"rover2"));
rovers.push( new rover("E",  ["L","M"],3,3,"rover3"));


function FindDirection(rover,i){
  let  DIRECTION = ["N","E","S","W"];
  ilkDurumIndex = DIRECTION.indexOf(rover.defaultDirection)
  if(rover.roverMove[i] === "R"){
    if(ilkDurumIndex+1 === DIRECTION.length) rover.defaultDirection = DIRECTION[0]	
    else rover.defaultDirection = DIRECTION[ilkDurumIndex+1]
  }  
  else if(rover.roverMove[i] === "L"){
     if(ilkDurumIndex-1 < 0) rover.defaultDirection = DIRECTION[DIRECTION.length-1]	
     else rover.defaultDirection = DIRECTION[ilkDurumIndex-1]
  }
}

function ManipulateDirectionAndCoordinate(rovers,rover,moveOccuredIndex){
 
  moveOccured = false;
  for(let i = 0 ;i<rover.roverMove.length;) {
       FindDirection(rover,i);
       if(rover.roverMove[i] === "M"){
        ManipulateNextCoordinate(rover);
        moveOccured = true;
        moveOccuredIndex = rovers.indexOf(rover) + 1;
      }
      rover.roverMove.shift();
      if(moveOccured)  break;
  }
  return moveOccuredIndex;
}

function ManipulateNextCoordinate(rover){
  switch(rover.defaultDirection){
     case "N" : rover.y = rover.y +1;break;
     case "S" : rover.y = rover.y -1;break;
     case "W" : rover.x = rover.x -1;break;
     case "E" : rover.x = rover.x +1;break;
       default:break;
   }
}

function startNextRoverMovementIndex(roverLength,moveOccuredIndex){
   if(moveOccuredIndex >= roverLength)
     return 0;
   else
    return moveOccuredIndex;
}

function hasMovementExist(){
  rovers = rovers.filter(s => s.roverMove.length> 0)
  if(rovers.length > 0) return true;
  else return false;
}


while(hasMovementExist()){            
      let nextRoverIndex = startNextRoverMovementIndex(rovers.length,moveOccuredIndex);
      let nextRover = rovers[nextRoverIndex];
      moveOccuredIndex = ManipulateDirectionAndCoordinate(rovers,nextRover,moveOccuredIndex);
      
      if(nextRover.roverMove.length < 1)
      console.log(nextRover.x,nextRover.y,nextRover.defaultDirection);  
}

 










