class DrawableObject {
  position_x = 0;
  position_y = 175;
  height = 250;
  width = 125;
  image;
  imageCache = {};
  currentImage = 0;
  collectable;

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

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position_x,
      this.position_y,
      this.width,
      this.height,
    );
  }
}
