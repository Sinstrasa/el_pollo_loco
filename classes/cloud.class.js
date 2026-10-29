class Cloud extends MovableObject {
  constructor(asset, start) {
    super().loadImage(asset);
    this.position_y = Math.random() * 20;
    this.position_x = start;
    this.width = 400;
    this.height = 250;
    this.moveLeft(0.05);
  }
}
