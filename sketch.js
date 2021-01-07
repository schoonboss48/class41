//Create variables here
var database
var dog,dogImage,dogImage1
var foodStock,foodS
var fedTime, lastFed
var feed,addFood,foodObj
function preload()
{
  //load images here
  dogImage=loadImage("images/dogImg.png")
  dogImage1=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500,500);
  database=firebase.database()

  dog=createSprite(250,300,150,150)
  dog.addImage(dogImage)
  dog.scale=0.15
  
  foodStock=database.ref("food")
  foodStock.on("value",readStock)

  feed=createButton("Feed the dog.")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add food.")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
}


function draw() {  
  background("white")

  foodObj.display()
  fedTime=database.ref("feedTime")
  fedTime.on("value",function(data){
    lastFed=data.val()
  })
  drawSprites();
  

}
function readStock(data){
  foodS=data.val()
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }
  database.ref("/").update({
    food: x
  })
}


