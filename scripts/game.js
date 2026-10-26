let canvas;
let ctx;
let character = new Image();

function initialise() {
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");
  character.src = "../assets/img/2_character_pepe/1_idle/idle/I-1.png";
  setTimeout(function () {
    ctx.drawImage(character, 10, 10, 50, 75);
  }, 1000);
}
