class Endboss extends MovableObject {
  position_x = 2500;
  position_y = 10;
  width = 350;
  height = 450;
  IMAGES_WALK = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_WAKE_UP = [
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
  ];

  constructor() {
    super().loadImage("assets/img/4_enemie_boss_chicken/3_attack/G20.png");
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WAKE_UP);
    // this.bossActivates();
  }

  bossActivates() {
    setTimeout(() => this.bossIntro(), 0);
    setTimeout(() => this.bossAlert(), 4000);
    setTimeout(() => this.bossMoves(), 13000);
  }

  bossIntro() {
    for (let index = 0; index < 3; index++) {
      this.animate(1, this.IMAGES_WAKE_UP);
    }
  }

  bossAlert() {
    this.animate(1, this.IMAGES_ALERT);
  }

  bossMoves() {
    this.animate(7, this.IMAGES_WALK);
    setInterval(() => {
      this.moveLeft(2);
    }, 1000 / 60);
  }
}
