class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.createBackground();
    this.draw();
    this.setWorld();
  }

  createBackground() {
    for (let index = 0; index < 4; index++) {
      if (index % 2 == 0) {
        this.level.background.push(new Background("assets/img/5_background/layers/air.png", 719 * index));
        this.level.background.push(new Background("assets/img/5_background/layers/3_third_layer/1.png", 719 * index));
        this.level.background.push(new Background("assets/img/5_background/layers/2_second_layer/1.png", 719 * index));
        this.level.background.push(new Background("assets/img/5_background/layers/1_first_layer/1.png", 719 * index)); 
      } else {
        this.level.background.push(new Background("assets/img/5_background/layers/air.png", 719 * index));
        this.level.background.push(new Background("assets/img/5_background/layers/3_third_layer/2.png", 719 * index));
        this.level.background.push(new Background("assets/img/5_background/layers/2_second_layer/2.png", 719 * index));
        this.level.background.push(new Background("assets/img/5_background/layers/1_first_layer/2.png", 719 * index)); 
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.background);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.coin);
    this.addObjectToMap(this.level.tabasko);
    this.addObjectToMap(this.level.enemies);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {self.draw();});
  }

  addObjectToMap(object) {
    object.forEach((o) => {this.addToMap(o);});
  }

  addToMap(movingObject) {
    this.mirrorImage(movingObject);
    this.ctx.drawImage(
      movingObject.image,
      movingObject.position_x,
      movingObject.position_y,
      movingObject.width,
      movingObject.height);
    this.mirrorImageReverse(movingObject);
  }

  mirrorImage(movingObject){
    if (movingObject.mirrored) {
      this.ctx.save();
      this.ctx.translate(movingObject.width, 0);
      this.ctx.scale(-1, 1);
      movingObject.position_x = movingObject.position_x * -1;
    }
  }

  mirrorImageReverse(movingObject) {
    if (movingObject.mirrored) {
      this.ctx.restore();
      movingObject.position_x = movingObject.position_x * -1;
    }
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
      if(enemy instanceof SmallChicken) enemy.moveTowardsCharacter();
    })
  }
}
