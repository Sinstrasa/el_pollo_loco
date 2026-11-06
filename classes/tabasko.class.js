class Tabasko extends MovableObject {
  width = 125;
  height = 125;
  collectable = 5;
  taken = false;
  itThrown = false
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
    this.intervalIdCollection(() => this.throw(), 1000 / 30);
  }

  throw() {
    if (this.world.character.world.keyboard.ENTER && this.world.character.sumCollected[1] > 0 && this.taken && !this.isThrown) {
      this.isThrown = true;
      this.position_x = this.world.character.position_x + 100;
      this.position_y = this.world.character.position_y + 50;
      this.fallVelocity = 5;
      this.intervalIdCollection(() => this.applyGravity(), 1000 / 30);
      this.intervalIdCollection(() => this.moveRight(7), 1000 / 60);
      this.loadImage("assets/img/6_salsa_bottle/salsa_bottle.png");
      this.world.character.sumCollected[1]--;
      this.world.level.statusbar[1].setPercentage(1, Math.round((this.world.character.sumCollected[1] / this.collectable) * 100));
    }
  }

  isCollected() {
    this.loadImage("");
  }
}
