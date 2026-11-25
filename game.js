let canvas;
let world;
let gameStarted = false;
let audio = new Audio("assets/audio/game_theme.mp3");
let audioAllowed = true;
let windowScreen = true;
let keyboard = new Keyboard();

/**
 * loads all relevant functions
 */
function initialise() {
  canvas = document.getElementById("game");
  world = new World(canvas, keyboard);
  loadFromLocalStorage();
  renderAudioButton();
  renderFullscreenButton();
}

/**
 * start the game when pressed by the start and reset button
 */
function startGame() {
  world.initialiseWorld();
  world.overlay.disappear();
  gameStarted = true;
  playAudio();
  hideButton("startButton");
  hideButton("retryButton");
  hideButton("homeButton");
  buttonPressed();
  buttonReleased();
}

function homeScreen() {
  world.overlay.width = 720;
  world.overlay.height = 480;
  world.overlay.position_y = 0;
  world.overlay.position_x = 0;
  world.overlay.loadImage(world.overlay.IMAGE_START);
  hideButton("retryButton");
  hideButton("homeButton");
  showButton("startButton");
}

/**
 * plays and pauses the audio when the game starts
 */
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

/**
 * shows and hides all buttons with the sent id
 */
function hideButton(id) {
  let button = document.getElementById(id);
  button.style.display = "none";
}

function showButton(id) {
  let button = document.getElementById(id);
  button.style.display = "block";
}

/**
 * saves and loads the status of the audio
 */
function saveToLocalStorage() {
  localStorage.setItem("audio", audioAllowed);
}

function loadFromLocalStorage() {
  const storedAudio = localStorage.getItem("audio");
  if (storedAudio != null) audioAllowed = storedAudio === "true";
}

/**
 * loads a template of a button
 */
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

/**
 * registers if played on fullscreen
 */
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

/**
 * switches between fullscreen and windowscreen
 */
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

/**
 * eventlistener to register the pressed keys on the keyboard
 */
document.addEventListener("keydown", (event) => keyPressed(event.key));
document.addEventListener("keyup", (event) => keyReleased(event.key));

function keyPressed(key) {
  switch (key) {
    case "w":
    case "i":
    case " ":
    case "ArrowUp":
      keyboard.SPACE = true;
      break;
    case "a":
    case "j":
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;
    case "d":
    case "l":
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
    case "i":
    case " ":
    case "ArrowUp":
      keyboard.SPACE = false;
      break;
    case "a":
    case "j":
    case "ArrowLeft":
      keyboard.LEFT = false;
      break;
    case "d":
    case "l":
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

/**
 * eventlistener to register pressed buttons for mobile version
 */
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
