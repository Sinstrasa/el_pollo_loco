class Chicken extends MovableObject {
  IMAGES_WALKING = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.position_x = 200 + Math.random() * 500;
    this.position_y = 300;
    this.width = 100;
    this.height = 125;
    this.animate(9, this.IMAGES_WALKING);
    this.moveLeft(0.15 + Math.random() * 0.25);
  }
}
