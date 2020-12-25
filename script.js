let canvas = document.getElementById('cobra');
let ctx = canvas.getContext('2d');
let box = 32

var button = document.querySelector('#reset');
var resultado = document.querySelector('#resultado');

let snake = [];
snake[0] = {
    x: 8 * box, 
    y: 8 * box
}



let direction = "top";

let food = {
    x: Math.floor(Math.random()* 15 + 1) * box,
    y: Math.floor(Math.random()* 15 + 1) * box
}
function criarBg() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0 ,16 * box, 16 * box);
}

function criarCobrinha(){
    for(let i = 0 ; i < snake.length ; i++ ){
        ctx.fillStyle = "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood(){
    ctx.fillStyle = "black";
    ctx.fillRect(food.x,food.y,box,box);
}

button.addEventListener("click", reset);

function reset(){
    window.location.reload();
}

document.addEventListener("keydown", update);

function update(event){
    if(event.keyCode ==  37 && direction != "right"){
        direction = "left"
    }
    if(event.keyCode ==  38 && direction != "down"){
        direction = "up"
    }
    if(event.keyCode ==  39 && direction != "left"){
        direction = "right"
    }
    if(event.keyCode ==  40 && direction != "up"){
        direction = "down"
    }
}

let contador = 0;
function moveSnake(){



    if(snake[0].x > 480 && direction == "right"){ snake[0].x = 0}
    if(snake[0].x < 0 && direction == "left"){ snake[0].x = 480}
    if(snake[0].y < 0 && direction == "up"){ snake[0].y = 480}
    if(snake[0].y > 480 && direction == "down"){ snake[0].y = 0}

    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            resultado.style.font = 'normal 20pt arial'
            resultado.innerHTML = 'GAME OVER!'
        }
    }

    criarBg()
    criarCobrinha()
    drawFood()

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right"){
        snakeX += box;
    }
    if(direction == "left"){
        snakeX -= box;
    }
    if(direction == "up"){
        snakeY -= box;
    }
    if(direction == "down"){
        snakeY += box;
    }



    if(snakeX != food.x || snakeY != food.y){
        snake.pop()
    }else{
        food.x = Math.floor(Math.random()* 15 + 1) * box,
        food.y = Math.floor(Math.random()* 15 + 1) * box
        contador++    
        resultado.innerHTML = contador;
    }



    let Head = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(Head);
}

let jogo = setInterval(moveSnake, 40);

