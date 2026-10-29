let canvas;
let world;
let keyboard = new Keyboard();

function initialise() {
  canvas = document.getElementById("game");
  world = new World(canvas, keyboard);
  console.log("My character is a", world.character);
}

document.addEventListener("keydown", (event) => keyPressed(event.key));
document.addEventListener("keyup", (event) => keyReleased(event.key));

function keyPressed(key) {
  switch (key) {
    case "w":
    case "W":
    case "i":
    case "I":
    case " ":
    case "ArrowUp":
      keyboard.SPACE = true;
      break;
    case "a":
    case "A":
    case "j":
    case "J":
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;
    case "d":
    case "D":
    case "l":
    case "L":
    case "ArrowRight":
      keyboard.RIGHT = true;
      break;
    case "Enter":
    case "Shift":
      keyboard.ENTER = true;
      break;
    default:
      break;
  }
}

function keyReleased(key) {
  switch (key) {
    case "w":
    case "W":
    case "i":
    case "I":
    case " ":
    case "ArrowUp":
      keyboard.SPACE = false;
      break;
    case "a":
    case "A":
    case "j":
    case "J":
    case "ArrowLeft":
      keyboard.LEFT = false;
      break;
    case "d":
    case "D":
    case "l":
    case "L":
    case "ArrowRight":
      keyboard.RIGHT = false;
      break;
    case "Enter":
    case "Shift":
      keyboard.ENTER = false;
      break;
    default:
      break;
  }
}
