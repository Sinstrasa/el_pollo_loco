class WinOver extends MovableObject {
  width = 250;
  height = 125;
  position_y = 175;
  IMAGE_START = ["assets/img/9_intro_outro_screens/start/startscreen_1.png"];
  IMAGE_WIN = ["assets/img/You won, you lost/You win B.png"];
  IMAGE_OVER = ["assets/img/You won, you lost/Game over A.png"];

  constructor() {
    super();
  }

  endscreen() {
    if (this.world.character.health <= 0) this.loadImage(this.IMAGE_OVER);
    else this.loadImage(this.IMAGE_WIN);
  }
}
