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
  counter = 0;
  setIntervalIdArray = [];

  /**
   * runs an interval with the sent function in a sent speed and saves it
   */
  intervalIdCollection(func, frame) {
    let id = setInterval(func, frame);
    this.setIntervalIdArray.push(id);
  }

  /**
   * stops all ongoing intervals to end the game
   */
  stopGame() {
    for (let index = 1; index <= 9999; index++) this.stopInterval(index);
  }

  stopInterval(id) {
    clearInterval(id);
  }

  /**
   * sends an array of frames of objects to animate
   */
  animate(array) {
      this.playAnimation(array);
  }

  /**
   * goes through an array with frames and loads every frame constantly
   */
  playAnimation(animation) {
    this.checkAnimation(animation);
    let index = this.currentImage % animation.length;
    this.initialiseImages(animation, index);
    if (index == animation.length - 1) this.currentImage = 0;
    else this.currentImage++;
  }

  /**
   * goes through an array with frames and loads every frame until the
   * function reaches the end of the array
   */
  playAnimationOnce(animation) {
    this.checkAnimation(animation);
    let index = Math.min(this.currentImage, animation.length - 1);
    this.initialiseImages(animation, index);
    if(this.currentImage < animation.length - 1) this.currentImage++;
  }

  /**
   * checks if loaded animation is a new animation and loads it from 
   * the start
   */
  checkAnimation(animation) {
    if (this.currentAnimation !== animation) {
      this.currentImage = 0;
      this.currentAnimation = animation;
    }
  }

  /**
   * loads image from an array
   */
  initialiseImages(animation, index) {
    let path = animation[index];
    this.image = this.imageCache[path];
  }

  /**
   * moves either left or right with a sent speed
   */
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

  /**
   * let object fall towards the ground
   */
  applyGravity() {
    if (this.isAboveGround() || this.fallVelocity > 0) {
      this.position_y -= this.fallVelocity;
      this.fallVelocity -= this.acceleration;
    } else this.fallVelocity = 0;
    if (this instanceof Character && this.position_y > 175.5) {
      this.position_y = 175.5;
    }
  }
  
  /**
   * checks if object is on the ground
   */
  isAboveGround() {
    if (this instanceof Tabasko) return true;
    else return this.position_y <= 175;
  }

  /**
   * checks if the hitbox of two objects are hittin each other
   */
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

  /**
   * reduces the health of an object down to a sent amount
   */
  hit(damage) {
    this.health -= damage;
    if(this.health < 0) this.health = 0;
    else this.lastHit = new Date().getTime();
  }

  /**
   * checks it the object has been hit
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * checks if endboss has been hit for a short invincibility
   */
  isVulnerable() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed > 1;
  }

  /**
   * checks if object's health is lower than 0
   */
  isDead() {
    return this.health == 0;
  }

  /**
   * makes an object invisible
   */
  disappear() {
    this.loadImage("");
  }
}
