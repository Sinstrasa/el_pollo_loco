let canvas;
let world;

function initialise() {
  canvas = document.getElementById("game");
  world = new World(canvas);
  console.log("My character is a", world.character);
}
