class Character extends MovableObject {
  position_y = 175.5;
  world;
  isLanding = false;
  sumCollected = [0, 0];
  offset = {top: 100, bottom: 110, left: 40, right: 20};
  lastButtonPressed = new Date().getTime();
  IMAGES_WALKING = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
  ];
  IMAGES_FALLING = [
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
  ];
  IMAGES_LANDING = [
    "assets/img/2_character_pepe/3_jump/J-38.png",
    "assets/img/2_character_pepe/3_jump/J-39.png",
  ]
  IMAGES_HURT = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_DEATH = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
    "assets/img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_IDLE = [
    "assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONG_IDLE = [
    "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  constructor() {
    super().loadImage("assets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadSprites();
    this.intervalIdCollection(() => this.animate(), 1000 / 15);
    this.intervalIdCollection(() => this.moveCharacter(), 1000 / 60);
    this.intervalIdCollection(() => this.applyGravity(), 1000 / 30);
  }

  loadSprites() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_FALLING);
    this.loadImages(this.IMAGES_LANDING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEATH);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
  }

  animate() {
    this.checkLastButton();
    if (this.isDead()) {
      this.deathAnimation();
    } else {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else this.jumpAnimation();
    }
  }

  deathAnimation() {
    this.playAnimationOnce(this.IMAGES_DEATH);
    this.stopInterval(this.setIntervalIdArray[1]);
  }

  jumpAnimation() {
    if ((this.world.keyboard.SPACE || this.isAboveGround()) && this.fallVelocity >= 0) {
      this.playAnimationOnce(this.IMAGES_JUMPING);
    } else {
      if (this.isAboveGround() && this.fallVelocity < 0) {
        this.isLanding = true
        this.playAnimationOnce(this.IMAGES_FALLING);
      } else {
        if (!this.isAboveGround() && this.isLanding) {
          this.playAnimationOnce(this.IMAGES_LANDING);
          this.isLanding = false;
        } else this.moveAnimation();
      }
    }
  }

  moveAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } 
    else this.idleAnimation(); 
  }

  idleAnimation() {
    if (this.readIdleTime()) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
    } else this.playAnimation(this.IMAGES_IDLE);
  }

  checkLastButton() {
    if(this.world.keyboard.SPACE || this.world.keyboard.ENTER || this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
      this.lastButtonPressed = new Date().getTime();
    }
  }

  readIdleTime() {
    let timePassed = (new Date().getTime() - this.lastButtonPressed) / 1000;
    return timePassed > 15;
  }

  moveCharacter() {
    if (this.world.keyboard.RIGHT && this.position_x < this.world.level.level_end_x) {
      this.moveRight(7);
    }
    if (this.world.keyboard.LEFT && this.position_x > -616) {
      this.moveLeft(7);
    }
    if (this.world.keyboard.SPACE) {
      if(!this.isAboveGround()) {
        this.jump();
      }
    }
    this.world.camera_x = -this.position_x + 100;
  }

  jump() {
    this.fallVelocity = 15;
  }

  collectCollectable(index, condition) {
    if (!condition) this.sumCollected[index]++;
  }
}
