// Vamos a usar http://processingjs.org/
// o https://p5js.org/reference/

// Importamos las librerias.
let { append, cons, first, isEmpty, isList, length, rest, map, forEach } = functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda.
function update(data, attribute){
	return Object.assign({}, data, attribute);
}

//////////////////////// Mundo inicial.
let Mundo = {}
////////////////////////

let sonidoDeComer;

/**
 * Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola.
 */
function moveSnake(snake, dir){
	const head = first(snake);
	return cons({ x: head.x + dir.x, y: head.y + dir.y }, snake.slice(0, length(snake) - 1));
}

const dx = 20;
const dy = 20;

const mapa = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
              [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
              [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			  [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
			  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
			  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
			  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
			  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
			  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
			  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
			  [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
			  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

// Retorna un entero aleatorio entre min (incluido) y max (excluido).
function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
}

//retorna 5 o 20 de manera aleatoria
function velocidadFruta(){
  if(getRandomInt(0,2)==0){
    return 5;
  }
  return 15;
}

//verifica que en el arreglo mapa hay un obstaculo representado con un 1 con dos numeros 
function verificarObstaculo (num1, num2){
	if (mapa[num1][num2] == 1){
		return verificarObstaculo(getRandomInt(1,18), getRandomInt(1,18));
	}
	return { x: num1, y: num2 };
}


/**
 * Esto se llama antes de iniciar el juego.
 */
function setup() {
	frameRate(5);
	createCanvas(400, 400);
	pic = [loadImage('https://i.imgur.com/yEYt3Qx.png'),
  loadImage('https://i.imgur.com/66vDTVv.png'),
  loadImage('https://i.imgur.com/vI5xke7.png'),
  loadImage('https://i.imgur.com/cX04Dfd.jpg'),
  loadImage('https://i.imgur.com/n89DNQW.jpg'), loadImage('https://i.imgur.com/PjL95UY.png')];
  sonidoDeComer = loadSound('../sounds/Fruit.mp3');
  
  Mundo = { snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], dir: { x: 1, y: 0 }, 
			  food: verificarObstaculo(getRandomInt(1,18), getRandomInt(1,18)), food2: { x: 21, y: 21 },
			  food3: { x: 22, y: 22 }, score: 10, multiplicador: 0, contadorfood2: 0, 
              obstaculo : [{x:4 , y:4}, {x:5, y:4}, {x:6 , y:4}, {x:7 ,y:4}, {x:12 , y:4}, {x:13 , y:4}, {x:14 , y:4}, {x:15 , y:4},
                {x:4 , y:5}, {x:15, y:5}, {x:4 , y:6}, {x:15 ,y:6}, {x:4 , y:7}, {x:15 , y:7}, {x:4 , y:12}, {x:15 , y:12},
                {x:4 , y:13}, {x:15, y:13}, {x:4 , y:14}, {x:15 ,y:14}, {x:4 , y:15}, {x:5 , y:15}, {x:6 , y:15}, {x:7 , y:15},
                {x:12 , y:15}, {x:13 , y:15}, {x:14 , y:15}, {x:15 , y:15}] };
}

// Dibuja la serpiente.
function drawSnake(snake){
	fill(201, 216, 46);
	forEach(snake, s =>	{ 
		rect(s.x * dx, s.y * dy, dx, dy);
	});
}

// Dibuja la comida.
function drawFood(food){
	image(pic[2], food.x * dx, food.y * dy, dx, dy);
}

// Dibuja la comida del poder que multiplica el puntaje
function drawFood2(food2){	
	image(pic[1], food2.x * dx, food2.y * dy, dx, dy);	
}

// Dibuja la comida de acelerar o relantizar el movimiento de la snake
function drawFood3(food3){	
	image(pic[0], food3.x * dx, food3.y * dy, dx, dy);	
}

// Dibuja toda el mundo en base al mapa.
function drawWorld(mapa){
	forEach(mapa, (row, i) => {
		forEach(row, (cell, j) => {
		  if(cell == 1) {
			image(pic[3], j * dx, i * dx, dx, dx);
		  } if (cell == 0) {
			fill(0, 0, 0);
			rect(j * dx, i * dx, dx, dx);
		  }
		} );
	  });
}

// Agrega a la serpiente un pedazo de cola al comer una fruta.
function eatSnake(snake, dir){
	const head = first(snake);
	return cons({ x: head.x + dir.x, y: head.y + dir.y }, snake);
}

// Hace que la serviente se vuelva más grande cuando se come una fruta del mapa con su cabeza y elimina la fruta.
function comer(snake, food){
	const head = first(snake);
		if (head.x === food.x && head.y === food.y){
			return true;
		}
}

// Hace que la serviente se vuelva más grande cuando se come una fruta del mapa con su cabeza y elimina la fruta de poder1.
function comer2(snake, food2){
	const head = first(snake);
		if (head.x === food2.x && head.y === food2.y){
			return true;
		}
}

// Hace que la serviente se vuelva más grande cuando se come una fruta del mapa con su cabeza y elimina la fruta de poder2.
function comer3(snake, food3){
	const head = first(snake);
		if (head.x === food3.x && head.y === food3.y){
			return true;
		}
}

// Dibujar score.
function drawScore(score){
  fill(250, 250, 250);
  textFont('Times New Roman', 18);
  text("Puntaje: " + score, 25, 375);
}


//determina si la cabeza de la serpiente se choca con una pared interna
function solidObstaculo(snake){
    const head = first(snake);
	if (mapa[head.x][head.y] == 1){
		window.location.replace('../html/gameOver.html');
	}
}

// Dibuja algo en el canvas. Aquí se pone todo lo que quieras pintar.
function drawGame(Mundo){	
	image(pic[5], 10, 10, 380, 380);
	drawWorld(mapa);		
	drawSnake(Mundo.snake);
	drawFood(Mundo.food);
	drawFood2(Mundo.food2);
	drawFood3(Mundo.food3);
  drawScore(Mundo.score);
  gameOver(Mundo.snake);
  solidObstaculo(Mundo.snake);
}

// Revisa las colisiones de la serpiente.
function gameOver(snake){
	const head = first(snake);
	if(head.x ==0 || head.y == 0 || head.y == 19 || head.x ==19){
    window.location.replace('../html/gameOver.html');
    }
  forEach(rest(snake), s =>{
    if(head.x==s.x && head.y==s.y){
      window.location.replace('../html/gameOver.html');
    }
  });
}

// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones.
function onTic(Mundo){
	if (Mundo.score >= 20){
		window.location.replace('../html/mundo3.html');
	}	
	if(comer(Mundo.snake, Mundo.food) == true){
    sonidoDeComer.play();
		if (Mundo.multiplicador == 0){
			return update(Mundo, { snake: eatSnake(Mundo.snake, Mundo.dir), food: verificarObstaculo(getRandomInt(1,18), getRandomInt(1,18)), score: Mundo.score + 1});
		}
		if (Mundo.contadorfood2 == 2){
			return update(Mundo, { snake: eatSnake(Mundo.snake, Mundo.dir), food: verificarObstaculo(getRandomInt(1,18), getRandomInt(1,18)), score: Mundo.score + 2, multiplicador: 0});
		}
		return update(Mundo, { snake: eatSnake(Mundo.snake, Mundo.dir), food: verificarObstaculo(getRandomInt(1,18), getRandomInt(1,18)), score: Mundo.score + 2, contadorfood2: Mundo.contadorfood2 + 1});
	}
	if (getRandomInt(1,30) == 10 && Mundo.food2.x == 21){
		return update(Mundo, { food2: verificarObstaculo(getRandomInt(1,18), getRandomInt(1,18))});
	}
	if(comer2(Mundo.snake, Mundo.food2) == true){
    sonidoDeComer.play();
		return update(Mundo, { snake: eatSnake(Mundo.snake, Mundo.dir), food2: { x: 23, y: 23 }, score: Mundo.score + 1, multiplicador: 1});
	}
	if (getRandomInt(1,30) == 10 && Mundo.food3.x == 22){
		return update(Mundo, { food3: verificarObstaculo(getRandomInt(1,18), getRandomInt(1,18))});
	}
	if(comer3(Mundo.snake, Mundo.food3) == true){
    sonidoDeComer.play();
		return update(Mundo, { snake: eatSnake(Mundo.snake, Mundo.dir), food3: { x: 22, y: 22 }, score: Mundo.score + 1},frameRate(velocidadFruta()));
	}
	return update(Mundo, { snake: moveSnake(Mundo.snake, Mundo.dir) });		
}

//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent(Mundo, event){
	return update(Mundo, {});
}

/**
* Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo stado del mundo
*/
function onKeyEvent(Mundo, keyCode){
	// Cambiamos la dirección de la serpiente. Noten que no movemos la serpiente. Solo la dirección
	switch (keyCode){
		case UP_ARROW:
    if(Mundo.dir.y==1){ 
			return update(Mundo, { dir: { y: 1, x: 0 } });
    }else{
      return update(Mundo, { dir: { y: -1, x: 0 } });
    }
			break;
		case DOWN_ARROW:
    if(Mundo.dir.y==-1){ 
			return update(Mundo, { dir: { y: -1, x: 0 } });
    }else{
      return update(Mundo, { dir: { y: 1, x: 0 } });
    }
			break;
		case LEFT_ARROW:
    if(Mundo.dir.x==1){ 
			return update(Mundo, { dir: { y: 0, x: 1 } });
   }else{
     return update(Mundo, { dir: { y: 0, x: -1 } });
   }
      break;
		case RIGHT_ARROW:
    if(Mundo.dir.x==-1){ 
			return update(Mundo, { dir: { y: 0, x: -1 } });
    }else{
      return update(Mundo, { dir: { y: 0, x: 1 } });
    }
			break;
		default:
			console.log(keyCode);
			return update(Mundo, {});
	}
}