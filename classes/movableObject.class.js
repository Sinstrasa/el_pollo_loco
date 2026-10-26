class MovableObject {
  position_x = 10;
  position_y = 60;
  image;
  height = 75;
  width = 50;

  loadImage(path) {
    this.image = new Image();
    this.image.src = path;
  }

  moveRight() {}
  moveLeft() {}
}
