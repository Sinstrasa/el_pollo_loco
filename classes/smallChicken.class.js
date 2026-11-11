class SmallChicken extends MovableObject {
  width = 75;
  height = 75;
  offset = {top: 5, bottom: 10, left: 15, right: 7};
  IMAGES_WALKING = [
    "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEATH = ["assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor(start) {
    super().loadImage("assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadSprites();
    this.position_x = start;
    this.position_y = 345;
    this.intervalIdCollection(() => this.animate(this.IMAGES_WALKING), 1000 / 9);
    console.log("Small Chicken: " + this.setIntervalIdArray);
  }

  loadSprites() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEATH);
  }

  actions() {
    if (this.isDead()) {
        this.loadImage(this.IMAGES_DEATH);
        this.stopInterval(this.setIntervalIdArray[0]);
      } else {
        if (this.world.character.position_x > this.position_x - 25) {
        this.moveRight(0.5);
      } else {
        this.moveLeft(0.5);
      }
    }
  }
}
