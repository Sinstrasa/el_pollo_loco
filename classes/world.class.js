class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  cloud = new Cloud();
  ctx;
  canvas;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.character.image, this.character.position_x, this.character.position_y, this.character.width, this.character.height);
    this.ctx.drawImage(this.cloud.image, this.cloud.position_x, this.cloud.position_y, this.cloud.width, this.cloud.height);
    this.enemies.forEach(enemy => {this.ctx.drawImage(enemy.image, enemy.position_x, enemy.position_y, enemy.width, enemy.height);});
    let self = this;
    requestAnimationFrame(function(){self.draw();});
  }
}
