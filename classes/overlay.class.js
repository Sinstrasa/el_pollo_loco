class Overlay extends MovableObject {
  width = 720;
  height = 480;
  position_y = 0;
  IMAGE_START = ["assets/img/9_intro_outro_screens/start/startscreen_1.png"];
  IMAGE_WIN = ["assets/img/You won, you lost/You win B.png"];
  IMAGE_OVER = ["assets/img/You won, you lost/Game over A.png"];

  constructor() {
    super();
    this.loadImage(this.IMAGE_START);
  }

  endscreen() {
    this.width = 240;
    this.height = 180;
    this.position_x = 240;
    this.position_y = 180;
    if (this.world.character.health <= 0) this.loadImage(this.IMAGE_OVER);
    else this.loadImage(this.IMAGE_WIN);
    showButton('retryButton');
  }
}
