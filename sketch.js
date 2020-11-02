//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dog1 = loadImage('images/Dog.png');
  dog2 = loadImage("images/happyDog.png")
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250,350,50,50);
  dog.addImage(dog1);
  dog.scale = 0.3;
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dog2);
  }

  drawSprites();
  //add styles here
  textSize(24);
  stroke(5);
  fill("White");
  text("Press Up Arrow To Feed Milk!", 90, 30);
  text("Food Remaining: " + foodS,150,200);
}

//Function to read values from Database
function readStock(data){
  foodS = data.val();
}

//Function to write values from Database
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food: x
  })
}