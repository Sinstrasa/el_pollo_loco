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
      case 'w':
      case 'W':
        keyboard.W = true;
        break;
      case 'a':
      case 'A':
        keyboard.A = true;
        break;
      case 'd':
      case 'D':
        keyboard.D = true;
        break;
      case 'ArrowLeft':
        keyboard.LEFT = true;
        break;
      case 'ArrowUp':
        keyboard.UP = true;
        break;
      case 'ArrowRight':
        keyboard.RIGHT = true;
        break;
      case 'i':
      case 'I':
        keyboard.I = true;
        break;
      case 'j':
      case 'J':
        keyboard.J = true;
        break;
      case 'l':
      case 'L':
        keyboard.L = true;
        break;
      case ' ':
        keyboard.SPACE = true;
        break;
      case 'Enter':
        keyboard.ENTER = true;
        break;
      case 'Shift':
        keyboard.SHIFT = true;
        break;
      default:
        break;
    }
  }

  function keyReleased(key) {
    switch (key) {
      case 'w':
      case 'W':
        keyboard.W = false;
        break;
      case 'a':
      case 'A':
        keyboard.A = false;
        break;
      case 'd':
      case 'D':
        keyboard.D = false;
        break;
      case 'ArrowLeft':
        keyboard.LEFT = false;
        break;
      case 'ArrowUp':
        keyboard.UP = false;
        break;
      case 'ArrowRight':
        keyboard.RIGHT = false;
        break;
      case 'i':
      case 'I':
        keyboard.I = false;
        break;
      case 'j':
      case 'J':
        keyboard.J = false;
        break;
      case 'l':
      case 'L':
        keyboard.L = false;
        break;
      case ' ':
        keyboard.SPACE = false;
        break;
      case 'Enter':
        keyboard.ENTER = false;
        break;
      case 'Shift':
        keyboard.SHIFT = false;
        break;
      default:
        break;
    }
  }
