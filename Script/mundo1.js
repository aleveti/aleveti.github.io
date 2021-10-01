/* Autores: Brayan Fernando Cruz Puerta - cruz.brayan@correounivalle.edu.co - 202041217
Juan David Garces Leon - juan.garces.leon@correounivalle.edu.co - 202043292*
Juan Pablo Lenis Rebollesdo - juan.rebolledo@correounivalle.edu.co - 202026107*
Maykin Rendon Montenegro - maykin.rendon@correounivalle.edu.co - 2025557*
*/

// Vamos a usar http://processingjs.org/
// o https://p5js.org/reference/

// Importamos las librerias.
let { append, cons, first, isEmpty, isList, length, rest, map, forEach } = functionalLight;

/**
 * Desarrollar una función que recibe dos objetos y agrega o modifica el objeto 1 con lo que tenga objeto 2.
 * @param {object, object}
 * @returns {object}
*/

function update(data, attribute){
	return Object.assign({}, data, attribute);
}

//////////////////////// Mundo inicial.
let Mundo = {}
////////////////////////

let sonidoDeComer;

/**
 * Actualiza la serpiente. Creando una nueva cabeza y removiendo la cola.
 * @param {array, object}
 * @returns {array}
 * @example moveSnake([{x:6, y:4}, {x:5, y:4}, {x:4, y:4}], {dir: {x: 1, y: 0}}) => [{x:7, y:4}, {x:6, y:4}, {x:5, y:4}]
 * @example moveSnake([{x:6, y:8}, {x:6, y:7}, {x:6, y:6}], {dir: {x: 0, y: 1}}) => [{x:6, y:9}, {x:6, y:8}, {x:6, y:7}]
 * @example moveSnake([{x:6, y:4}, {x:5, y:4}, {x:4, y:4}], {dir: {x: 0, y: 1}}) => [{x:6, y:5}, {x:6, y:4}, {x:5, y:4}]
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
			        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];


/**
 * Retorna un entero aleatorio entre min (incluido) y max (excluido).
 * @param {number, number}
 * @returns {number}
 * @example getRandomInt(4,10) => 6
 * @example getRandomInt(0,2) => 1
 * @example getRandomInt(4,10) => 9
 */

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Retorna 5 o 20 de manera aleatoria.
 * @param {}
 * @returns {number}
 * @example velocidadFruta() => 5
 * @example velocidadFruta() => 15
 * @example velocidadFruta() => 5
 */

function velocidadFruta(){
  if(getRandomInt(0,2)==0){
    return 5;
  }
  return 15;
}

/**
 * Esto se llama antes de iniciar el juego.
 * @param {}
 * @returns {object}
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
			  food: { x: getRandomInt(1,18), y: getRandomInt(1,18)}, food2: { x: 21, y: 21 },
			  food3: { x: 22, y: 22 }, score: 0, multiplicador: 0, contadorfood2: 0};
}

/**
 * Desarrollar una función que dibuje la serpiente.
 * @param {array}
 * @returns {array}
 */

function drawSnake(snake){
	fill(201, 216, 46);
	forEach(snake, s =>	{ 
		rect(s.x * dx, s.y * dy, dx, dy);
	});
}

/**
 * Desarrollar una función que dibuje la comida principal del juego.
 * @param {arrray}
 * @returns {array}
 */

function drawFood(food){
	image(pic[2], food.x * dx, food.y * dy, dx, dy);
}

/**
 * Desarrollar una función que dibuje la comida que da el poder de multiplicar el puntaje en el juego.
 * @param {arrray}
 * @returns {array}
 */

function drawFood2(food2){	
	image(pic[1], food2.x * dx, food2.y * dy, dx, dy);	
}


/**
 * Desarrollar una función que dibuje la comida que da el poder de acelerar o relentizar el movimiento de la serpiente.
 * @param {arrray}
 * @returns {array}
 */

function drawFood3(food3){	
	image(pic[0], food3.x * dx, food3.y * dy, dx, dy);	
}

/**
 * Desarrollar una función "drawWorld" que dibuja todo el mundo en base al mapa.
 * @param {arrray}
 * @returns {array}
 */

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

/**
 * Función que agrega a la serpiente un pedazo de cola al comer una fruta.
 * @param {arrray, object}
 * @returns {array}
 */

function eatSnake(snake, dir){
	const head = first(snake);
	return cons({ x: head.x + dir.x, y: head.y + dir.y }, snake);
}

/**
 * Hace que la serpiente se vuelva más grande cuando se come una fruta del mapa con su cabeza y elimina la fruta.
 * @param {array, array}
 * @returns {bolean}
 * @example comer({x:2, y:3}, {x:2, y:3}) => true
 * @example comer({x:2, y:3}, {x:1, y:1}) => null
 * @example comer({x:5, y:5}, {x:5, y:5}) => true
 */

function comer(snake, food){
	const head = first(snake);
		if (head.x === food.x && head.y === food.y){
			return true;
		}
}

/**
 * Retorna "true" si la cabeza de la serpiente esta en la misma posición de la fruta dos.
 * @param {array, array}
 * @returns {boolean}
 * @example comer2({x:2, y:3}, {x:2, y:3}) => true
 * @example comer2({x:2, y:3}, {x:1, y:1}) => null
 * @example comer2({x:5, y:5}, {x:5, y:5}) => true
 */

function comer2(snake, food2){
	const head = first(snake);
		if (head.x === food2.x && head.y === food2.y){
			return true;
		}
}


/**
 * Retorna true si la cabeza de la serpiente esta en la misma posicion de la fruta tres.
 * @param {array,array}
 * @returns {boolean}
 * @example comer3({x:2, y:3}, {x:2, y:3}) => true
 * @example comer3({x:2, y:3}, {x:1, y:1}) => null
 * @example comer3({x:5, y:5}, {x:5, y:5}) => true
 */

function comer3(snake, food3){
	const head = first(snake);
		if (head.x === food3.x && head.y === food3.y){
			return true;
		}
}

/**
 * Función que dibuja el score en el juego.
 * @param {array}
 * @returns {array}
 */

function drawScore(score){
  fill(250, 250, 250);
  textFont('Times New Roman', 18);
  text("Puntaje: " + score, 25, 375);
}

/**
 * Función que dibuja algo en el canvas. Aquí se pone todo lo que se quiera pintar.
 * @param {object}
 * @returns {object}
 */

function drawGame(Mundo){
	drawWorld(mapa);
	image(pic[5], 10, 10, 380, 380);
	drawSnake(Mundo.snake);
	drawFood(Mundo.food);
	drawFood2(Mundo.food2);
	drawFood3(Mundo.food3);
  drawScore(Mundo.score);
  gameOver(Mundo.snake);
}

/*
 * Desarrollar una función que identifique las colisiones de la serpiente.
 * @param {array}
 * @returns {array}
 * @example (gameOver(snake) == head.x == 0) => true 
 * @example (gameOver(snake) == head.y == 19) => true
 * @example (gameOver(snake) == head.y == 1) => false
 */

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

/**
 * Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones.
 * @param {object}
 * @returns {object}
 */

function onTic(Mundo){
	if (Mundo.score >= 10){
		window.location.replace('../html/mundo2.html');
	}	
	if(comer(Mundo.snake, Mundo.food) == true){
    sonidoDeComer.play();
		if (Mundo.multiplicador == 0){
			return update(Mundo, { snake: eatSnake(Mundo.snake, Mundo.dir), food: { x: getRandomInt(1,18), y: getRandomInt(1,18) }, score: Mundo.score + 1});
		}
		if (Mundo.contadorfood2 == 2){
			return update(Mundo, { snake: eatSnake(Mundo.snake, Mundo.dir), food: { x: getRandomInt(1,18), y: getRandomInt(1,18) }, score: Mundo.score + 2, multiplicador: 0});
		}
		return update(Mundo, { snake: eatSnake(Mundo.snake, Mundo.dir), food: { x: getRandomInt(1,18), y: getRandomInt(1,18) }, score: Mundo.score + 2, contadorfood2: Mundo.contadorfood2 + 1});
	}
	if (getRandomInt(1,30) == 10 && Mundo.food2.x == 21){
		return update(Mundo, { food2: { x: getRandomInt(1,18), y: getRandomInt(1,18) }});
	}
	if(comer2(Mundo.snake, Mundo.food2) == true){
    sonidoDeComer.play();	
		return update(Mundo, { snake: eatSnake(Mundo.snake, Mundo.dir), food2: { x: 23, y: 23 }, score: Mundo.score + 1, multiplicador: 1});
	}
	if (getRandomInt(1,30) == 10 && Mundo.food3.x == 22){
		return update(Mundo, { food3: { x: getRandomInt(1,18), y: getRandomInt(1,18) }});
	}
	if(comer3(Mundo.snake, Mundo.food3) == true){
    sonidoDeComer.play();
		return update(Mundo, { snake: eatSnake(Mundo.snake, Mundo.dir), food3: { x: 22, y: 22 }, score: Mundo.score + 1},frameRate(velocidadFruta()));
	}
	return update(Mundo, { snake: moveSnake(Mundo.snake, Mundo.dir) });		
}

/**
 * Implementar esta función si quiere que su programa reaccione a eventos del mouse.
 * @param {object, object}
 * @returns {object}
 */

function onMouseEvent(Mundo, event){
	return update(Mundo, {});
}

/**
 * Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo estado del mundo. Con "switch" cambiamos la dirección de la serpiente. Noten que no movemos la serpiente. Solo la dirección.
 * @param {object, object}
 * @returns {object}
*/

function onKeyEvent(Mundo, keyCode){
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