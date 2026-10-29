class SmallChicken extends MovableObject {
  width = 75;
  height = 75;
  IMAGES_WALKING = [
    "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor(start) {
    super().loadImage("assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.position_x = start;
    this.position_y = 345;
    this.animate(9, this.IMAGES_WALKING);
    this.moveLeft(0.5);
  }
}
