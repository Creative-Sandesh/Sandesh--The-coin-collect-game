//game contants and variables
let inputDir ={x:0,y:0};
const foodSound = new Audio("assets\audio\food.mp3");
const gameOverSound = new Audio('assets\audio\gameover.mp3');
const moveSound = new Audio('assets\audio\move.mp3');
const musicSound = new Audio('D:\Project\WEB_DEV\Game\assets\audio\music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let sandeshArr = [{x:13,y:15}];
let food = {x:5,y:7};


// Game Fuctions
function main(ctime){
    window.requestAnimationFrame(main); 
    if((ctime - lastPaintTime)/ 1000<1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    
}

function isCollide(sandesh){ 
    // if sandesh has hit itself
    for(let i=1; i<sandeshArr.length; i++){
        if(sandesh[i].x===sandesh[0].x && sandesh[i].y===sandesh[0].y){
            return true;
        }
    }
    // if you bump in the wall
        if (sandesh[0].x>=18|| sandesh[0].x<=0 || sandesh[0].y>=18 || sandesh[0].y<=0){
            return true;
        }
    
}

function gameEngine(){
    // update the sandesh array and array
    if(isCollide(sandeshArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again!");
        sandeshArr=[{x:13,y:15}];
        musicSound.play();
        score = 0;

    }
    // if sandesh had eaten food then increase the score and regenerate the food 
        if(sandeshArr[0].y===food.y && sandeshArr[0].x===food.x){
            foodSound.play();
            score+=1;
            if(score>highScoreValue){
                highScoreValue = score;
                localStorage.setItem("highScore",JSON.stringify(highScoreValue));
                highScoreBox.innerHTML="Hi Score: "+highScoreValue;
            }
            scoreBox.innerHTML ="Score: "+ score;
            sandeshArr.unshift({x: sandeshArr[0].x + inputDir.x, y: sandeshArr[0].y + inputDir.y});
            let a=3;
            let b=16;
            food ={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
        }

    // move the sandesh
    for(let i=sandeshArr.length-2; i>=0; i--){
        
        sandeshArr[i+1]= {...sandeshArr[i]};
    }
    sandeshArr[0].x += inputDir.x;
    sandeshArr[0].y += inputDir.y;

    // display the sandesh and food
    // display the sandesh
    board.innerHTML = "";
    sandeshArr.forEach((e, index)=> {
        sandeshElement= document.createElement('div');
        sandeshElement.style.gridRowStart=e.y;
        sandeshElement.style.gridColumnStart=e.x;
        if(index===0){
            sandeshElement.classList.add('header');
        }
        else{
            sandeshElement.classList.add('sandesh');
        }
        board.appendChild(sandeshElement);
    });
    //display the food 
    foodElement= document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// Main logic starts here
let highScore = localStorage.getItem("highScore");
if(highScore===null){
    highScoreValue=0;
    localStorage.setItem("highScore",JSON.stringify(highScoreValue));
}
else
{
    highScoreValue=JSON.parse(highScore);
    highScoreBox.innerHTML="Hi Score: "+highScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};// start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp" );
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;  
        default:
            break;
    }
}
)