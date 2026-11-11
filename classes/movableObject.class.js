class MovableObject extends DrawableObject {
  mirrored = false;
  fallVelocity = 0;
  acceleration = 0.5;
  currentAnimation;
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

  playAnimation(animation) {
    this.checkAnimation(animation);
    let index = this.currentImage % animation.length;
    this.initialiseImages(animation, index);
    if (index == animation.length - 1) this.currentImage = 0;
    else this.currentImage++;
  }

  playAnimationOnce(animation) {
    this.checkAnimation(animation);
    let index = Math.min(this.currentImage, animation.length - 1);
    this.initialiseImages(animation, index);
    if(this.currentImage < animation.length - 1) this.currentImage++;
  }

  checkAnimation(animation) {
    if (this.currentAnimation !== animation) {
      this.currentImage = 0;
      this.currentAnimation = animation;
    }
  }

  initialiseImages(animation, index) {
    let path = animation[index];
    this.image = this.imageCache[path];
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
    if(this.health < 0) {
      this.health = 0;
    }
    else this.lastHit = new Date().getTime();
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  isDead() {
    return this.health == 0;
  }

  disappear() {
    this.loadImage("");
  }
}
