class Chicken extends MovableObject {
  position_y = 300;
  width = 100;
  height = 125;
  offset = {top: 5, bottom: 15, left: 0, right: 0};
  IMAGES_WALKING = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEATH = ["assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor(start) {
    super().loadImage("assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png");
    this.loadSprites();
    this.position_x = start;
    this.animate(9, this.IMAGES_WALKING);
    this.actions();
  }

  loadSprites() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEATH);
  }

  actions() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEATH);
      } else {
        this.moveLeft(0.15 + Math.random() * 0.25);
      }
    }, 1000 / 60);
  }
}
