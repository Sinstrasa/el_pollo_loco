class Cloud extends MovableObject {
  constructor() {
    super().loadImage("assets/img/5_background/layers/4_clouds/1.png");
    this.position_y = 0;
    this.position_x = 500;
    this.width = 400;
    this.height = 250;
    this.moveLeft(0.05);
  }
}
