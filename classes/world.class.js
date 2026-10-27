class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  cloud = new Cloud();
  background = [
    new Background("assets/img/5_background/layers/air.png", 0),
    new Background("assets/img/5_background/layers/3_third_layer/1.png", 0),
    new Background("assets/img/5_background/layers/2_second_layer/1.png", 0),
    new Background("assets/img/5_background/layers/1_first_layer/1.png", 0),
  ];
  ctx;
  canvas;
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjectToMap(this.background);
    this.addToMap(this.cloud);
    this.addObjectToMap(this.enemies);
    this.addToMap(this.character);
    let self = this;
    requestAnimationFrame(function () {self.draw();});
  }

  addObjectToMap(object) {
    object.forEach((o) => {this.addToMap(o);});
  }

  addToMap(movingObject) {
    this.ctx.drawImage(
      movingObject.image,
      movingObject.position_x,
      movingObject.position_y,
      movingObject.width,
      movingObject.height,
    );
  }

  setWorld() {
    this.character.world = this;
  }
}
