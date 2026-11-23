let canvas;
let world;
let gameStarted = false;
let audio = new Audio("assets/audio/game_theme.mp3");
let audioAllowed = true;
let windowScreen = true;
let keyboard = new Keyboard();

function initialise() {
  canvas = document.getElementById("game");
  world = new World(canvas, keyboard);
  loadFromLocalStorage();
  renderAudioButton();
  renderFullscreenButton();
  buttonPressed();
  buttonReleased();
}

function startGame(id) {
  world.initialiseWorld();
  world.overlay.disappear();
  gameStarted = true;
  playAudio();
  hideButton(id);
}

function playAudio() {
  if (audioAllowed) {
    if (gameStarted) {
      audio.loop = true;
      audio.play();
    }
    renderAudioButton();
    saveToLocalStorage();
  }
}

function stopAudio() {
  if (gameStarted) {
    audio.pause();
  }
  audioAllowed = false;
  renderAudioButton();
  saveToLocalStorage();
}

function hideButton(id) {
  let button = document.getElementById(id);
  button.style.display = "none";
}

function showButton(id) {
  let button = document.getElementById(id);
  button.style.display = "block";
}

function saveToLocalStorage() {
  localStorage.setItem("audio", audioAllowed);
}

function loadFromLocalStorage() {
  const storedAudio = localStorage.getItem("audio");
  if (storedAudio != null) audioAllowed = storedAudio === "true";
}

function renderAudioButton() {
  let audioButton = document.getElementById("sound");
  if (audioAllowed) {
    audioButton.innerHTML = activeAudioButtonTemplate();
  } else audioButton.innerHTML = deactiveAudioButtonTemplate();
}

function renderFullscreenButton() {
  let fullscreenButton = document.getElementById("fullscreen");
  if (windowScreen)
    fullscreenButton.innerHTML = activateFullscreenButtonTemplate();
  else fullscreenButton.innerHTML = deactivateFullscreenButtonTemplate();
}

function checkFullscreen() {
  if (windowScreen) {
    openFullscreen();
    windowScreen = false;
  } else {
    closeFullscreen();
    windowScreen = true;
  }
  renderFullscreenButton();
}

function openFullscreen() {
  let screen = document.getElementById("gamewrapper");
  if (screen.requestFullscreen) {
    screen.requestFullscreen();
  } else if (screen.webkitRequestFullscreen) {
    /* Safari */
    screen.webkitRequestFullscreen();
  } else if (screen.msRequestFullscreen) {
    /* IE11 */
    screen.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
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
      world.throwBottle();
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

function buttonPressed() {
  document.getElementById("buttonLeft").addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById("buttonRight").addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById("buttonJump").addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById("buttonAction").addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.ENTER = true;
    world.throwBottle();
  });
}

function buttonReleased() {
  document.getElementById("buttonLeft").addEventListener("touchend", () => {
  keyboard.LEFT = false;
  });
  document.getElementById("buttonRight").addEventListener("touchend", () => {
  keyboard.RIGHT = false;
  });
  document.getElementById("buttonJump").addEventListener("touchend", () => {
  keyboard.SPACE = false;
  });
  document.getElementById("buttonAction").addEventListener("touchend", () => {
    keyboard.ENTER = false;
  });
}
