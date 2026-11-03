class Character extends MovableObject {
  position_y = 175.5;
  world;
  offset = { top: 100, bottom: 110, left: 40, right: 20 };
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
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEATH);
  }

  animate(frame) {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEATH);
      } else {
        if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
        } else {
          if (this.world.keyboard.SPACE) {
            this.playAnimation(this.IMAGES_JUMPING);
          } else {
            if (this.isAboveGround()) {
              this.playAnimation(this.IMAGES_FALLING);
            } else {
              if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
              }
            }
          }
        }
      }
    }, 1000 / frame);
    this.moveCharacter();
  }

  moveCharacter() {
    setInterval(() => {
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
    }, 1000 / 60);
  }

  jump() {
    this.fallVelocity = 15;
  }
}
