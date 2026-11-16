class Tabasko extends MovableObject {
  width = 125;
  height = 125;
  collectable = 5;
  taken = false;
  touchEnemy = false;
  IMAGE_AIR = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  IMAGES_SPLASH = [
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    "",
  ];

  constructor(asset, position_x, position_y, top, bottom, left, right) {
    super().loadImage(asset);
    this.loadImages(this.IMAGE_AIR);
    this.loadImages(this.IMAGES_SPLASH);
    this.position_x = position_x;
    this.position_y = position_y;
    this.offset = {top: top, bottom: bottom, left: left, right: right};
  }

  throwTabasko() {
    this.throwDirection();
    this.fallVelocity = 5;
    this.intervalIdCollection(() => this.applyGravity(), 1000 / 30);
    this.intervalIdCollection(() => this.throwAnimation(), 1000 / 12);
    
  }

  throwDirection() {
    if (!this.world.character.mirrored) {
      this.throwRight();
    } else {
      this.throwLeft();
    }
  }

  throwRight() {
    this.position_x = this.world.character.position_x + 100;
    this.position_y = this.world.character.position_y + 50;
    this.intervalIdCollection(() => this.moveRight(7), 1000 / 60);
  }

  throwLeft() {
    this.position_x = this.world.character.position_x - this.world.character.offset.left;
    this.position_y = this.world.character.position_y + 50;
    this.intervalIdCollection(() => this.moveLeft(7), 1000 / 60);
  }

  throwAnimation() {
    if (!this.touchEnemy) this.playAnimation(this.IMAGE_AIR);
    else this.playAnimationOnce(this.IMAGES_SPLASH);
  }
}
