class Overlay extends MovableObject {
  width = 720;
  height = 480;
  position_y = 0;
  IMAGE_START = ["assets/img/9_intro_outro_screens/start/startscreen_1.png"];
  IMAGE_WIN = ["assets/img/You won, you lost/You win B.png"];
  IMAGE_OVER = ["assets/img/You won, you lost/Game over A.png"];

  /**
   * loads all relevant functions at the start
   */
  constructor() {
    super();
    this.loadImage(this.IMAGE_START);
  }

  /**
   * displays the winning and loosing endscreen
   */
  endscreen() {
    this.defaultPosition();
    if (this.world.character.health <= 0) this.loadImage(this.IMAGE_OVER);
    else {
      this.width = 480;
      this.position_x = 100;
      this.loadImage(this.IMAGE_WIN);
    }
    showButton('retryButton');
  }

  /**
   * changes the position and size of the overlay
   */
  defaultPosition() {
    this.width = 240;
    this.height = 180;
    this.position_x = 240;
    this.position_y = 180;
  }
}
