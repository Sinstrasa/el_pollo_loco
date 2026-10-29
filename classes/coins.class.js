class Coin extends MovableObject {
  width = 125;
  height = 125;
  IMAGE_PULSE = [
    "assets/img/8_coin/coin_2.png",
    "assets/img/8_coin/coin_1.png",
  ];

  constructor(position_x, position_y) {
    super().loadImage("assets/img/8_coin/coin_1.png");
    this.loadImages(this.IMAGE_PULSE);
    this.position_x = position_x;
    this.position_y = position_y;
    this.animate(7, this.IMAGE_PULSE);
  }
}
