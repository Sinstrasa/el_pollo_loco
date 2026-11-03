class MovableObject {
  position_x = 0;
  position_y = 175;
  image;
  height = 250;
  width = 125;
  imageCache = {};
  currentImage = 0;
  mirrored = false;
  fallVelocity = 0;
  acceleration = 0.5;
  offset = {};
  health = 100;
  lastHit = 0;

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
    if (index == animation.length - 1) this.currentImage = 0;
    else this.currentImage++;
  }

  moveLeft(speed) {
    this.position_x -= speed;
    if (this instanceof Character) this.mirrored = true;
    else this.mirrored = false;
  }

  moveRight(speed) {
    this.position_x += speed;
    if (this instanceof Character) this.mirrored = false;
    else this.mirrored = true;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.fallVelocity > 0) {
        this.position_y -= this.fallVelocity;
        this.fallVelocity -= this.acceleration;
      }
    }, 1000 / 30);
  }

  isAboveGround() {
    return this.position_y <= 175;
  }

  isColliding(movingObject) {
    const thisLeft = this.position_x + this.offset.left;
    const thisRight = this.position_x + this.width - this.offset.right;
    const thisTop = this.position_y + this.offset.top;
    const thisBottom = this.position_y + this.height;
    const objectLeft = movingObject.position_x + movingObject.offset.left;
    const objectRight = movingObject.position_x + movingObject.width - movingObject.offset.right;
    const objectTop = movingObject.position_y + movingObject.offset.top;
    const objectBottom = movingObject.position_y + movingObject.height - movingObject.offset.bottom;
    return thisLeft < objectRight && thisRight > objectLeft && thisTop < objectBottom && thisBottom > objectTop;
  }

  jumpsOnEnemy(movingObject) {
    const thisLeft = this.position_x + this.offset.left;
    const thisRight = this.position_x + this.width - this.offset.right;
    const thisBottom = this.position_y + this.height;
    const objectLeft = movingObject.position_x + movingObject.offset.left;
    const objectRight = movingObject.position_x + movingObject.width - movingObject.offset.right;
    const objectTop = movingObject.position_y + movingObject.offset.top;
    return thisLeft < objectRight && thisRight > objectLeft && thisBottom > objectTop;
  }

  hit(damage) {
    this.health -= damage;
    if(this.health < 0) this.health = 0;
    else this.lastHit = new Date().getTime();
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.health == 0;
  }
}
