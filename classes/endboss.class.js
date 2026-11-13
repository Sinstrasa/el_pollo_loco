class Endboss extends MovableObject {
  position_x = 2500;
  position_y = 10;
  width = 350;
  height = 450;
  counter = 0;
  encounter = false;
  offset = {top: 60, bottom: 70, left: 30, right: 20};
  IMAGES_WALK = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_HURT = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEATH = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage("assets/img/4_enemie_boss_chicken/3_attack/G20.png");
    this.loadSprites();
    this.intervalIdCollection(() => this.bossActivates(), 1000 / 7);
    this.intervalIdCollection(() => this.bossMoves(), 1000 / 60);
  }

  loadSprites() {
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEATH);
  }

  bossActivates() {
    if (this.counter <= 10) {
        this.playAnimationOnce(this.IMAGES_ALERT);
        this.counter++;
      } else {
        this.playAnimation(this.IMAGES_WALK);
      }
      if (this.world.character.position_x >= 2100 && !this.encounter) {
        this.counter = 0;
        this.encounter = true;
      }
  }

  bossMoves() {
    if (this.encounter) this.moveLeft(2);
  }
}
