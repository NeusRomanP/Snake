let snake=document.getElementById("snake");
let game = document.getElementById("game");

let gameWidth = 500;
let gameHeight = 500;
let speed = 300;

let snakeStartPointX=200;
let snakeStartPointY=200;

const blockSize=20;

if((snakeStartPointX/blockSize!=0)){
    snakeStartPointX=Math.floor(snakeStartPointX/blockSize)*blockSize;
}

if((snakeStartPointY/blockSize!=0)){
    snakeStartPointY=Math.floor(snakeStartPointY/blockSize)*blockSize;
}

snake.style.top=snakeStartPointY+"px";
snake.style.left=snakeStartPointX+"px";

snake.style.height=blockSize+"px";
snake.style.width=blockSize+"px";

let snakePosY=snake.offsetTop;
let snakePosX=snake.offsetLeft;
let snakeBottomPos=snake.offsetTop+blockSize;
let snakeRightPos= snake.offsetLeft+blockSize;
let tailX=snake.offsetLeft-blockSize;
let tailY=snake.offsetTop-blockSize;
let blocks=[];
let direction = "up";
let eat = false;
let lastKey;
let key="start";
let interval;
let lastElementsPosition=[];
let directions=[];
let foodPosX;
let foodPosY;
let snakeCollision=false;
let lost=false;
let endgame=false;
let canPress=true;

if((gameWidth/blockSize)!=0){
    gameWidth=Math.ceil(gameWidth/blockSize)*blockSize;
}
if((gameHeight/blockSize)!=0){
    gameHeight=Math.ceil(gameHeight/blockSize)*blockSize;
}

game.style.width=gameWidth+"px";
game.style.height=gameHeight+"px";


createFood();

document.addEventListener("keydown", function(event){
    if(!lost && canPress){
        if(event.key=="ArrowUp" || event.key=="ArrowDown" || event.key=="ArrowLeft" || event.key=="ArrowRight"){
            lastKey=key;
            key=event.key;
            
            canPress=false;
            if(lastKey=="start" || lastKey==key){
                if(lastKey=="ArrowUp" && key!="ArrowUp" && key!="ArrowDown"){
                    clearInterval(interval);
                    interval= setInterval(move, speed, event);
                }else if(lastKey=="ArrowDown" && key!="ArrowUp" && key!="ArrowDown"){
                    clearInterval(interval);
                    interval= setInterval(move, speed, event);
                }else if(lastKey=="ArrowLeft" && key!="ArrowLeft" && key!="ArrowRight"){
                    clearInterval(interval);
                    interval= setInterval(move, speed, event);
                }else if(lastKey=="ArrowRight" && key!="ArrowLeft" && key!="ArrowRight"){
                    clearInterval(interval);
                    interval= setInterval(move, speed, event);
                }else if(lastKey=="start"){
                    interval= setInterval(move, speed, event);
                }
                
            }else{
                if(lastKey=="ArrowUp" && key!="ArrowUp" && key!="ArrowDown"){
                    clearInterval(interval);
                    interval= setInterval(move, speed, event);
                }else if(lastKey=="ArrowDown" && key!="ArrowUp" && key!="ArrowDown"){
                    clearInterval(interval);
                    interval= setInterval(move, speed, event);
                }else if(lastKey=="ArrowLeft" && key!="ArrowLeft" && key!="ArrowRight"){
                    clearInterval(interval);
                    interval= setInterval(move, speed, event);
                }else if(lastKey=="ArrowRight" && key!="ArrowLeft" && key!="ArrowRight"){
                    clearInterval(interval);
                    interval= setInterval(move, speed, event);
                }
            }
        }
    }
    
    function move(event){
        if(event.key==="ArrowUp"){
            snakePosY-=blockSize;
            snakeBottomPos-=blockSize;
            snake.style.top=snakePosY+"px";
            direction="up";
            let elements=document.getElementsByClassName("snake");
    
            for(let i=0; i<elements.length;i++) {
                if(i===0){
                    let block = new Block(snakePosX, snakePosY, direction);
                    if(lastElementsPosition[i]==undefined){
                        lastElementsPosition.push(block);
                        directions.push(direction);
                    }else{
                        lastElementsPosition[i]=block;
                        directions[i]=direction;
                    }
                    
                    moveTail(elements[i], snakePosX, snakePosY, i, direction);
                }else{
                    if(lastElementsPosition[i]==undefined){
                        lastElementsPosition.push(blocks[i-1]);
                    }else{
                        lastElementsPosition[i]=blocks[i-1];
                        
                    }
                    
                    if(lastElementsPosition[i-1].dir=="left"){
                        moveTail(elements[i], lastElementsPosition[i-1].posX+blockSize, lastElementsPosition[i-1].posY, i, lastElementsPosition[i].dir);
                    }else if (lastElementsPosition[i-1].dir=="up"){
                        moveTail(elements[i], lastElementsPosition[i-1].posX, lastElementsPosition[i-1].posY+blockSize, i, lastElementsPosition[i].dir);
                    }else if(lastElementsPosition[i-1].dir=="right"){
                        moveTail(elements[i], lastElementsPosition[i-1].posX-blockSize, lastElementsPosition[i-1].posY, i, lastElementsPosition[i].dir);
                    }else{
                        moveTail(elements[i], lastElementsPosition[i-1].posX, lastElementsPosition[i-1].posY-blockSize, i, lastElementsPosition[i].dir);
                    }
                }
                
            }

            for(let i=0; i<elements.length; i++){
                changeDirection(i);
            }

            if(lastElementsPosition[0].posX==foodPosX && lastElementsPosition[0].posY==foodPosY){
                eat=true;
            }

            if(eat){
                let lastPosX=lastElementsPosition[lastElementsPosition.length-1].posX;
                let lastPosY=lastElementsPosition[lastElementsPosition.length-1].posY;
                let lastDir=directions[lastElementsPosition.length-1];
                if(lastDir=="up"){
                    drawBlock(lastPosX, lastPosY+blockSize, lastDir);
                }else if(lastDir=="down"){
                    drawBlock(lastPosX, lastPosY-blockSize, lastDir);
                }else if(lastDir=="left"){
                    drawBlock(lastPosX+blockSize, lastPosY, lastDir);
                }else{
                    drawBlock(lastPosX-blockSize, lastPosY, lastDir);
                }
                removeFood();
                createFood();
                eat=false;
            }
            
        }
        if(event.key==="ArrowDown"){
            snakePosY+=blockSize;
            snakeBottomPos+=blockSize;
            snake.style.top=snakePosY+"px";
            direction="down";
            let elements=document.getElementsByClassName("snake");
    
            for(let i=0; i<elements.length;i++) {
                if(i===0){
                    let block = new Block(snakePosX, snakePosY, direction);
                    if(lastElementsPosition[i]==undefined){
                        lastElementsPosition.push(block);
                    }else{
                        lastElementsPosition[i]=block;
                    }
                    
                    moveTail(elements[i], snakePosX, snakePosY, i, direction);
                }else{
                    if(lastElementsPosition[i]==undefined){
                        lastElementsPosition.push(blocks[i-1]);
                    }else{
                        lastElementsPosition[i]=blocks[i-1];
                    }
                    
                    if(lastElementsPosition[i-1].dir=="left"){
                        moveTail(elements[i], lastElementsPosition[i-1].posX+blockSize, lastElementsPosition[i-1].posY, i, lastElementsPosition[i].dir);
                    }else if (lastElementsPosition[i-1].dir=="up"){
                        moveTail(elements[i], lastElementsPosition[i-1].posX, lastElementsPosition[i-1].posY+blockSize, i, lastElementsPosition[i].dir);
                    }else if(lastElementsPosition[i-1].dir=="right"){
                        moveTail(elements[i], lastElementsPosition[i-1].posX-blockSize, lastElementsPosition[i-1].posY, i, lastElementsPosition[i].dir);
                    }else{
                        moveTail(elements[i], lastElementsPosition[i-1].posX, lastElementsPosition[i-1].posY-blockSize, i, lastElementsPosition[i].dir);
                    }
                    
                }
            }

            for(let i=0; i<elements.length; i++){
                changeDirection(i);
            }

            if(lastElementsPosition[0].posX==foodPosX && lastElementsPosition[0].posY==foodPosY){
                eat=true;
            }

            if(eat){
                let lastPosX=lastElementsPosition[lastElementsPosition.length-1].posX;
                let lastPosY=lastElementsPosition[lastElementsPosition.length-1].posY;
                let lastDir=directions[lastElementsPosition.length-1];
                if(lastDir=="up"){
                    drawBlock(lastPosX, lastPosY+blockSize, lastDir);
                }else if(lastDir=="down"){
                    drawBlock(lastPosX, lastPosY-blockSize, lastDir);
                }else if(lastDir=="left"){
                    drawBlock(lastPosX+blockSize, lastPosY, lastDir);
                }else{
                    drawBlock(lastPosX-blockSize, lastPosY, lastDir);
                }
                removeFood();
                createFood();
                eat=false;
            }

            
        }
        if(event.key==="ArrowLeft"){
            snakePosX-=blockSize;;
            snakeRightPos-=blockSize;
            snake.style.left=snakePosX+"px";
            direction="left";

            let elements=document.getElementsByClassName("snake");
    
            for(let i=0; i<elements.length;i++) {
                if(i===0){
                    let block = new Block(snakePosX, snakePosY, direction);
                    if(lastElementsPosition[i]==undefined){
                        lastElementsPosition.push(block);
                    }else{
                        lastElementsPosition[i]=block;
                    }
                    
                    moveTail(elements[i], snakePosX, snakePosY, i, direction);
                }else{
                    if(lastElementsPosition[i]==undefined){
                        lastElementsPosition.push(blocks[i-1]);
                    }else{
                        lastElementsPosition[i]=blocks[i-1];
                    }
                    
                    if(lastElementsPosition[i-1].dir=="left"){
                        moveTail(elements[i], lastElementsPosition[i-1].posX+blockSize, lastElementsPosition[i-1].posY, i, lastElementsPosition[i].dir);
                    }else if (lastElementsPosition[i-1].dir=="up"){
                        moveTail(elements[i], lastElementsPosition[i-1].posX, lastElementsPosition[i-1].posY+blockSize, i, lastElementsPosition[i].dir);
                    }else if(lastElementsPosition[i-1].dir=="right"){
                        moveTail(elements[i], lastElementsPosition[i-1].posX-blockSize, lastElementsPosition[i-1].posY, i, lastElementsPosition[i].dir);
                    }else{
                        moveTail(elements[i], lastElementsPosition[i-1].posX, lastElementsPosition[i-1].posY-blockSize, i, lastElementsPosition[i].dir);
                    }
                    
                }
            }

            for(let i=0; i<elements.length; i++){
                changeDirection(i);
            }

            if(lastElementsPosition[0].posX==foodPosX && lastElementsPosition[0].posY==foodPosY){
                eat=true;
            }

            if(eat){
                let lastPosX=lastElementsPosition[lastElementsPosition.length-1].posX;
                let lastPosY=lastElementsPosition[lastElementsPosition.length-1].posY;
                let lastDir=directions[lastElementsPosition.length-1];
                if(lastDir=="up"){
                    drawBlock(lastPosX, lastPosY+blockSize, lastDir);
                }else if(lastDir=="down"){
                    drawBlock(lastPosX, lastPosY-blockSize, lastDir);
                }else if(lastDir=="left"){
                    drawBlock(lastPosX+blockSize, lastPosY, lastDir);
                }else{
                    drawBlock(lastPosX-blockSize, lastPosY, lastDir);
                }
                removeFood();
                createFood();
                eat=false;
            }
        }
        if(event.key==="ArrowRight"){
            snakePosX+=blockSize;
            snakeRightPos+=blockSize;
            snake.style.left=snakePosX+"px";
            direction="right";
            let elements=document.getElementsByClassName("snake");
    
            for(let i=0; i<elements.length;i++) {
                if(i===0){
                    let block = new Block(snakePosX, snakePosY, direction);
                    if(lastElementsPosition[i]==undefined){
                        lastElementsPosition.push(block);
                    }else{
                        lastElementsPosition[i]=block;
                    }
                    
                    moveTail(elements[i], snakePosX, snakePosY, i, direction);
                }else{
                    if(lastElementsPosition[i]==undefined){
                        lastElementsPosition.push(blocks[i-1]);
                    }else{
                        lastElementsPosition[i]=blocks[i-1];
                    }
                    
                    if(lastElementsPosition[i-1].dir=="left"){
                        moveTail(elements[i], lastElementsPosition[i-1].posX+blockSize, lastElementsPosition[i-1].posY, i, lastElementsPosition[i].dir);
                    }else if (lastElementsPosition[i-1].dir=="up"){
                        moveTail(elements[i], lastElementsPosition[i-1].posX, lastElementsPosition[i-1].posY+blockSize, i, lastElementsPosition[i].dir);
                    }else if(lastElementsPosition[i-1].dir=="right"){
                        moveTail(elements[i], lastElementsPosition[i-1].posX-blockSize, lastElementsPosition[i-1].posY, i, lastElementsPosition[i].dir);
                    }else{
                        moveTail(elements[i], lastElementsPosition[i-1].posX, lastElementsPosition[i-1].posY-blockSize, i, lastElementsPosition[i].dir);
                    }
                    
                }
            }

            for(let i=0; i<elements.length; i++){
                changeDirection(i);
            }

            if(lastElementsPosition[0].posX==foodPosX && lastElementsPosition[0].posY==foodPosY){
                eat=true;
            }

            if(eat){
                let lastPosX=lastElementsPosition[lastElementsPosition.length-1].posX;
                let lastPosY=lastElementsPosition[lastElementsPosition.length-1].posY;
                let lastDir=directions[lastElementsPosition.length-1];
                if(lastDir=="up"){
                    drawBlock(lastPosX, lastPosY+blockSize, lastDir);
                }else if(lastDir=="down"){
                    drawBlock(lastPosX, lastPosY-blockSize, lastDir);
                }else if(lastDir=="left"){
                    drawBlock(lastPosX+blockSize, lastPosY, lastDir);
                }else{
                    drawBlock(lastPosX-blockSize, lastPosY, lastDir);
                }
                removeFood();
                createFood();
                eat=false;
            }
        }
        detectSnakeCollision();
        detectBorderCollision();
        canPress=true;
    }
})

function detectSnakeCollision(){


    if(key=="ArrowUp"){
        for(let i=1; i<lastElementsPosition.length; i++){
            if(lastElementsPosition[0].posY==lastElementsPosition[i].posY && lastElementsPosition[0].posX==lastElementsPosition[i].posX){
                snakeCollision=true;
                break;
            }
        }
    }

    if(key=="ArrowDown"){
        for(let i=1; i<lastElementsPosition.length; i++){
            if(lastElementsPosition[0].posY==lastElementsPosition[i].posY && lastElementsPosition[0].posX==lastElementsPosition[i].posX){
                snakeCollision=true;
                break;
            }
        }
    }

    if(key=="ArrowLeft"){
        for(let i=1; i<lastElementsPosition.length; i++){
            if(lastElementsPosition[0].posY==lastElementsPosition[i].posY && lastElementsPosition[0].posX==lastElementsPosition[i].posX){
                snakeCollision=true;
                break;
            }
        }
    }

    if(key=="ArrowRight"){
        for(let i=1; i<lastElementsPosition.length; i++){
            if(lastElementsPosition[0].posY==lastElementsPosition[i].posY && lastElementsPosition[0].posX==lastElementsPosition[i].posX){
                snakeCollision=true;
                break;
            }
        }
    }

    if(snakeCollision){
        drawEndgameBanner();
    }

}

function detectBorderCollision(){
    if(lastElementsPosition[0].posY<0 || lastElementsPosition[0].posY>=gameHeight || lastElementsPosition[0].posX<0 || lastElementsPosition[0].posX>=gameWidth){
        drawEndgameBanner();
    }
}

function drawEndgameBanner(){
    let endgameText=document.getElementById("endgame-text");
    let endgameBanner=document.getElementById("endgame-banner");
    endgameText.innerHTML="YOU LOST";
    endgameText.style.color="red";
    endgameBanner.style.visibility="visible";
    endgameBanner.style.backgroundColor="#0009";
    lost=true;
    clearInterval(interval);
}

function createFood(){
    let minLeft=0;
    let minTop=0;
    let canSpawn=false;
    let spawned=false;
    let emptyPositions=[];
    while(!canSpawn && !lost){
        foodPosX=Math.floor((Math.random() * ((minLeft+gameWidth+9-blockSize) - minLeft + 1) + minLeft)/blockSize)*blockSize;
        foodPosY=Math.floor((Math.random() * ((minTop+gameHeight+9-blockSize) - minTop + 1) + minTop)/blockSize)*blockSize;

        if(lastElementsPosition.length==0){
            if(foodPosY==200 && foodPosX==200){
                canSpawn=false;
            }else{
                canSpawn=true;
            }
        }else{
            
            for(let i=0; i<Math.floor(gameWidth/blockSize); i++){
                for(let j=0; j<Math.floor(gameHeight/blockSize); j++){
                    foodPosX=i*blockSize;
                    foodPosY=j*blockSize;

                    if(foodPosY==lastElementsPosition[0].posY && foodPosX==lastElementsPosition[0].posX){
                        canSpawn=false;
                        continue;
                    }else{
                        canSpawn=true;
                    }
                    
                    for(let k=0; k<blocks.length; k++){
                        if(foodPosY==blocks[k].posY && foodPosX==blocks[k].posX){
                            canSpawn=false;
                            break;
                        }else{
                            canSpawn=true;
                        }
                        
                    }
                    if(canSpawn){
                        emptyPositions.push({posX:i*blockSize, posY:j*blockSize});
                    }
                    
                }
                
            }

            if (!canSpawn && emptyPositions.length==0){
                lost=true;
                break;
            }
            
            emptyLength=emptyPositions.length-1;
            let emptyPos=Math.floor(Math.random() * (emptyLength-0+1)+0);
            foodPosX=emptyPositions[emptyPos].posX;
            foodPosY=emptyPositions[emptyPos].posY;
            break;

        }
        
    }

    var element = document.createElement("div");
    element.className = "food";
    element.style.top=foodPosY+"px";
    element.style.left=foodPosX+"px";
    element.style.height=blockSize+"px";
    element.style.width=blockSize+"px";
    document.getElementById("game").appendChild(element);
}

function removeFood(){
    let food = document.getElementsByClassName("food")[0];
    food.remove();
}

function changeDirection(pos){
    if(directions[pos]==undefined){
        directions.push(lastElementsPosition[pos].dir);
        lastElementsPosition[pos].dir=directions[pos-1];
    }else{
        directions[pos]=lastElementsPosition[pos].dir;
        lastElementsPosition[pos].dir=directions[pos-1];
    }
}

function drawBlock(x, y, dir){
    let block = new Block(x, y, dir);
    block.draw();
    blocks.push(block);
    eat=false;
}

function moveTail(element, x, y, pos, dir){
        element.style.top=y+"px";
        element.style.left=x+"px";
        if(pos!=0){
            blocks[pos-1].posY=y;
            blocks[pos-1].posX=x;
            blocks[pos-1].dir=dir;
        }
        
}

class Block{
    constructor(posX, posY, dir){
        this.posX=posX;
        this.posY=posY;
        this.dir=dir;
    }

    draw(){
        var element = document.createElement("div");
        element.className = "snake";
        element.style.top=this.posY+"px";
        element.style.left=this.posX+"px";
        element.style.height=blockSize+"px";
        element.style.width=blockSize+"px";
        document.getElementById("game").appendChild(element);
    }
}