var balloon, balloonImage1, balloonImage2;
// crea aquí la base de datos y la variable de posición 

function preload() {
   bg = loadImage("cityImage.png");
   balloonImage1 = loadAnimation("hotairballoon1.png");
   balloonImage2 = loadAnimation("hotairballoon1.png", "hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
}

/**
 * Función para configurar el entorno inicial
 */
function setup() {
  database = firebase.database();
  const balloonPosition = database.ref('balloon/heigth');
 // balloonPosition.on("value", readPosition, showError);

  console.log("mi valos de firebase:  ", balloonPosition);
  createCanvas(1500,700);

  balloon = createSprite(250, 450, 150, 150);
  balloon.addAnimation("hotAirBalloon", balloonImage1);
  balloon.scale = 0.5;
  textSize(20);
}

// función para mostrar la Interfaz del Usuario (UI por sus siglas en inglés)
function draw() {
  background(bg);

  if (keyDown(LEFT_ARROW)) {
    console.log("izquierda")
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.velocityX = -2;
    balloon.velocityY = 0;
    //escribe el código para mover el globo aerostático en dirección hacia la izquierda
    
  }
  else if (keyDown(RIGHT_ARROW)) {
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.velocityX = 2;
    balloon.velocityY = 0;
    //escribe el código para mover el globo aerostático en dirección hacia la derecha
  }
  else if (keyDown(UP_ARROW)) {
    updateHeigth(0, -10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale - 0.01;
    balloon.velocityX = 0;
    balloon.velocityY = -2;
    //escribe el código para mover el globo aerostático en dirección ascendente
  } else if (keyDown(DOWN_ARROW)) {
    
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.velocityX = 0;
    balloon.velocityY = 2;
    //escribe el código para mover el globo aerostático en dirección descendente
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**¡Utiliza las teclas de flecha para mover el globo aerostático!",40,40);
}

function updateHeigth(x, y){
  database.ref('balloon/heigth').set({
    'x': x,
    'y': y
  })
}

function readPosition(data){

  heigth = data.val();
  balloon.x = heigth.x;
  balloon.y = heigth.y;
}
function showError(){
  console.log("Error no se pudo acceder a la base de datos y guardar datos");
}