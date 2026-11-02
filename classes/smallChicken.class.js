class SmallChicken extends MovableObject {
  width = 75;
  height = 75;
  offset = {top: 5, bottom: 10, left: 15, right: 7};
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
    this.showPosition();
  }

  moveTowardsCharacter(){
    setInterval(() => {
      if (this.world.character.position_x > this.position_x - 25) {
        this.moveRight(0.5);
      } else {
        this.moveLeft(0.5);
      }
    }, 1000 / 60);
  };

  showPosition() {
    setInterval(() => {
      console.log(
        this.position_x + this.offset.right,
        this.position_y + this.offset.top,
        this.width - this.offset.left,
        this.height - this.offset.bottom
      );
    }, 1000);
  }
}
