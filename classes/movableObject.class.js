class MovableObject {
  position_x = 0;
  position_y = 175;
  image;
  height = 250;
  width = 125;
  imageCache = {};
  currentImage = 0;
  mirrored = false;

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
        this.playAnimation(array);
    }, 1000 / frame);
  }

  playAnimation(animation) {
    let index = this.currentImage % animation.length;
    let path = animation[index];
    this.image = this.imageCache[path];
    if (index == (animation.length - 1)) this.currentImage = 0;
    else this.currentImage++;
  }

  // moveCharacter() {
  //   setInterval(() => {
  //     if(this instanceof Character && this.world.keyboard.RIGHT) {
  //       this.position_x += 7
  //       this.mirrored = false;
  //     }
  //     if(this instanceof Character && this.world.keyboard.LEFT) {
  //       this.position_x -= 7;
  //       this.mirrored = true;
  //     }
  //   }, 1000 / 60);
  // }

  moveLeft(speed) {
    setInterval(() => {
      this.position_x -= speed;
    }, 1000 / 60);
  }
}
