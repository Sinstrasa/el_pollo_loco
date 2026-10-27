class MovableObject {
  position_x = 50;
  position_y = 175;
  image;
  height = 250;
  width = 125;
  imageCache = {};
  currentImage = 0;

  loadImage(path) {
    this.image = new Image();
    this.image.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  animate(frame, array) {
    setInterval(() => {
      let index = this.currentImage % array.length;
      let path = array[index];
      this.image = this.imageCache[path];
      if (index == (array.length - 1)) this.currentImage = 0;
      else this.currentImage++;
    }, 1000 / frame);
  }

  moveRight() {}

  moveLeft(speed) {
    setInterval(() => {
      this.position_x -= speed;
    }, 1000 / 60);
  }
}
