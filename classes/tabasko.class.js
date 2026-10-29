class Tabasko extends MovableObject {
  width = 125;
  height = 125;
  IMAGE_AIR = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(asset, position_x, position_y) {
    super().loadImage(asset);
    this.loadImages(this.IMAGE_AIR);
    this.position_x = position_x;
    this.position_y = position_y;
  }
}
