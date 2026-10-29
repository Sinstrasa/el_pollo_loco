class Endboss extends MovableObject {
  position_x = 2500;
  position_y = 10;
  width = 350;
  height = 450;
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

  constructor() {
    super().loadImage("assets/img/4_enemie_boss_chicken/1_walk/G2.png");
    this.loadImages(this.IMAGES_ALERT);
    this.animate(9, this.IMAGES_ALERT);
  }
}
