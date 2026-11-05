class Tabasko extends MovableObject {
  width = 125;
  height = 125;
  IMAGE_AIR = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(asset, position_x, position_y, top, bottom, left, right, id) {
    super().loadImage(asset);
    this.loadImages(this.IMAGE_AIR);
    this.position_x = position_x;
    this.position_y = position_y;
    this.id = id;
    this.offset = {top: top, bottom: bottom, left: left, right: right};
  }

  throw() {
    this.position_x = this.world.character.position_x;
    this.position_y = this.world.character.position_y;
    this.fallVelocity = 5;
    this.intervalIdCollection(() => this.applyGravity(), 1000 / 30);
    // this.applyGravity();
    this.intervalIdCollection(() => this.moveRight(5), 1000 / 60);
    // setInterval(() => {
    //   this.moveRight(5);
    // }, 1000 / 60);
    console.log("Tabasko: " + this.setIntervalIdArray);
  }

  isCollected() {
    this.loadImage("");
  }
}
