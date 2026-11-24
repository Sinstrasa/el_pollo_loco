class Background extends MovableObject {
  /**
   * loads all relevant functions at the start
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.width = 720;
    this.height = 480;
    this.position_x = x;
    this.position_y = 480 - this.height;
  }
}
