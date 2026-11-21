function activeAudioButtonTemplate() {
  return `<button class="sounds" onclick="stopAudio()">
            <img src="assets/buttons/sound_on.svg" alt="Sound Icon">
          </button>`;
}

function deactiveAudioButtonTemplate() {
    return `<button class="sounds" onclick="audioAllowed = true; playAudio()">
              <img src="assets/buttons/sound_off.svg" alt="Sound Icon">
            </button>`;
}

function activateFullscreenButtonTemplate() {
  return `<button class="fullscreen" onclick="checkFullscreen()">
            <img src="assets/buttons/fullscreen.png" alt="Fullscreen Icon">
          </button>`
}

function deactivateFullscreenButtonTemplate() {
  return `<button class="fullscreen" onclick="checkFullscreen()">
            <img src="assets/buttons/window.png" alt="Window Icon">
          </button>`
}