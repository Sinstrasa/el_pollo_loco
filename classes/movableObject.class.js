class MovableObject extends DrawableObject {
  mirrored = false;
  fallVelocity = 0;
  acceleration = 0.5;
  offset = {};
  health = 100;
  lastHit = 0;
  sumCollected;
  id;
  setIntervalIdArray = [];

  intervalIdCollection(func, frame) {
    let id = setInterval(func, frame);
    this.setIntervalIdArray.push(id);
  }

  stopInterval(id) {
    clearInterval(id);
  }

  animate(array) {
      this.playAnimation(array);
  }
  // animate(array, frame) {
  //   setInterval(() => {
  //     this.playAnimation(array);
  //   }, 1000 / frame);
  // }

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
    if (this.isAboveGround() || this.fallVelocity > 0) {
      this.position_y -= this.fallVelocity;
      this.fallVelocity -= this.acceleration;
    } else this.fallVelocity = 0;
    if (this instanceof Character && this.position_y > 175.5) {
      this.position_y = 175.5;
    }
  }
  // applyGravity() {
  //   setInterval(() => {
  //     if (this.isAboveGround() || this.fallVelocity > 0) {
  //       this.position_y -= this.fallVelocity;
  //       this.fallVelocity -= this.acceleration;
  //     }
  //   }, 1000 / 30);
  // }

  isAboveGround() {
    if (this instanceof Tabasko) return true;
    else return this.position_y <= 175;
  }

  isColliding(movingObject) {
    return this.hitLeft(movingObject) &&
      this.hitRight(movingObject) &&
      this.hitTop(movingObject) &&
      this.hitBottom(movingObject);
  }

  jumpsOnEnemy(movingObject) {
    return this.hitLeft(movingObject) &&
      this.hitRight(movingObject) &&
      this.hitBottom(movingObject);
  }

  hitLeft(movingObject) {
    return this.position_x + this.offset.left < movingObject.position_x + movingObject.width - movingObject.offset.right;
  }

  hitRight(movingObject) {
    return this.position_x + this.width - this.offset.right > movingObject.position_x + movingObject.offset.left;
  }

  hitTop(movingObject) {
    return this.position_y + this.offset.top < movingObject.position_y + movingObject.height - movingObject.offset.bottom;
  }

  hitBottom(movingObject) {
    return this.position_y + this.height > movingObject.position_y + movingObject.offset.top;
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
