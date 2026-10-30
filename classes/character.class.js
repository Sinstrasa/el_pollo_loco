class Character extends MovableObject {
  position_y = 175;
  world;
  IMAGES_WALKING = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "assets/img/2_character_pepe/3_jump/J-31.png",
    "assets/img/2_character_pepe/3_jump/J-32.png",
    "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
  ];
  IMAGES_FALLING = [
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    "assets/img/2_character_pepe/3_jump/J-38.png",
    "assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  constructor() {
    super().loadImage("assets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadSprites();
    this.animate(15);
    this.applyGravity();
  }

  loadSprites() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_FALLING);
  }

  animate(frame) {
    setInterval(() => {
      if (this.world.keyboard.SPACE) {
        this.playAnimation(this.IMAGES_JUMPING);
        this.jump();
      }
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_FALLING);
      }
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / frame);
    this.moveCharacter();
  }

  moveCharacter() {
    setInterval(() => {
      if (
        this.world.keyboard.RIGHT &&
        this.position_x < this.world.level.level_end_x
      ) {
        this.moveRight(7);
      }
      if (this.world.keyboard.LEFT && this.position_x > -616) {
        this.moveLeft(7);
      }
      this.world.camera_x = -this.position_x + 100;
    }, 1000 / 60);
  }

  jump() {
    if (!this.isAboveGround()) {
      this.fallVelocity = 15;
    }
  }
}
