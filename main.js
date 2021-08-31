let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');   /*context desenha o q vai acontecer dentro do campo */ 
let box = 32;  //quadrado onde vai ficar o jogo. 32 é o tam em pixels
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = 'right';  // Direção da cobrinha 
let food = { /* criação da comida da cobrinha aleatoriamente. Os números representam os espaços permitidos que o quadradinho apareça, no caso o box da cobrinha */ 
    x: Math.floor(Math.random() * 15 + 1) * box,   
    y: Math.floor(Math.random() * 15 + 1) * box  
}

function criarBG(){  /* Função que vai desenhar e definir */ 
    context.fillStyle = 'lightblue';  /*Definição de cor. Filldtyle trabalha com a cor do contexto (no caso o jogo/quadrado do jogo) */ 
    context.fillRect(0, 0, 16 * box, 16 * box); /* fillReck vai desenhar o retangulo onde vai acontecer o jogo. Ele trabalha com 4 parametros: posições de x e y, altura e largura. No caso vai ter 16 por 16 que totaliza 32 que ta ali em cima no box*/ 
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
  /* criação da comida da cobrinha */ 
function drawFood(){
    context.fillStyle = 'red';  /*cor da comida */ 
    context.fillRect(food.x, food.y, box, box);  /*espaço onde ela pode aparecer aleatoriamente */ 
}

document.addEventListener('keydown', update);  /*keydown = movimento de clique no teclado. Update é a ação/função */ 

function update(event){   /* direções que a cobrinha andará e não voltando ao contrário (!= é negativa) */ 
    if(event.keyCode == 37 && direction != 'right') direction = 'left'; 
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){  
   /* aqui no if é onde está definido que ela deve andar dentro do box e sair do lado oposto. Padrão PONTO CARTESIANO. */ 
    if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

     /* criação da função de game over + alert relatando isso */ 
     for(i = 1; i<snake.length; i++){
         if(snake[0].x == snake[i].x && snake [0].y == snake[i].y){
             clearInterval(jogo);
             alert('Game Over :( ');
         }

     }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;  //definir o ponto de partida e direções 
    let snakeY = snake[0].y;  //x e y são as direções  

    /* Coordenadas das direções da cobrinha */ 
    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakeX -= box; 
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;

    /*condição da cobrinha após comer um quadradinho, onde ela aumenta conforme come */ 
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();  // Retira o ultimo movimento 
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;   
        food.y =Math.floor(Math.random() * 15 + 1) * box;
    }

        /* Direita aumenta 1 quadradinho que tira da esquerda e vai pra direita(frente). como se fosse uma nova cabeça após comer o quadradinho */ 
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 150); /* função q atualiza o jogo de tempos em tempos durante um intervalo. 100milisegundos  */ 