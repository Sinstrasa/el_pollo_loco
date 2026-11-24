class World {
  ctx;
  canvas;
  keyboard;
  lastThrown = 0;
  overlay = new Overlay();

  /**
   * loads all relevant functions at the beginning
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.loadTitle();
    this.setOverlay();
  }

  /**
   * loads the titlescreen
   */
  loadTitle() {
    this.overlay.image.onload = () => {
      this.addToMap(this.overlay);
    }
  }

  /**
   * registers all assets into the game
   */
  initialiseWorld() {
    initLevel();
    this.character = new Character();
    this.level = level1;
    this.camera_x = 0;
    this.setIntervalIdArray = [];
    this.collectedBottle = [];
    this.createBackground();
    this.draw();
    this.setWorld();
    this.intervalIdCollection(() => this.run(), 1000 / 30);
  }

  /**
   * runs an interval with the sent function in a sent speed and saves it
   */
  intervalIdCollection(func, frame) {
    let id = setInterval(func, frame);
    this.setIntervalIdArray.push(id);
  }

  /**
   * loads the background
   */
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

  /**
   * loads all assets into the game
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addLevelObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.addObjectToMap(this.level.statusbar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.overlay);
    let self = this;
    requestAnimationFrame(function () {self.draw();});
  }

  /**
   * loads all objects, stored in an array for the fitting class
   */
  addLevelObjects() {
    this.addObjectToMap(this.level.background);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.coin);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.level.tabasko);
  }

  addObjectToMap(object) {
    object.forEach((o) => {this.addToMap(o);});
  }

  /**
   * places all assets into the canvas
   */
  addToMap(movingObject) {
    this.mirrorImage(movingObject);
    this.ctx.drawImage(
      movingObject.image,
      movingObject.position_x,
      movingObject.position_y,
      movingObject.width,
      movingObject.height);
    // this.showHitbox(movingObject);
    this.mirrorImageReverse(movingObject);
  }

  /**
   * mirrors asset
   */
  mirrorImage(movingObject){
    if (movingObject.mirrored) {
      this.ctx.save();
      this.ctx.translate(movingObject.width, 0);
      this.ctx.scale(-1, 1);
      movingObject.position_x = movingObject.position_x * -1;
    }
  }

  /**
   * restores the mirroring
   */
  mirrorImageReverse(movingObject) {
    if (movingObject.mirrored) {
      this.ctx.restore();
      movingObject.position_x = movingObject.position_x * -1;
    }
  }

  /**
   * draws an outline for objects
   */
  showHitbox(movingObject) {
    if(movingObject instanceof Character || movingObject instanceof Chicken || movingObject instanceof SmallChicken || movingObject instanceof Coin || movingObject instanceof Tabasko || movingObject instanceof Endboss) {
    this.ctx.beginPath();
    this.ctx.lineWidth = "3";
    this.ctx.strokeStyle = "red";
    this.ctx.rect(
      movingObject.position_x + movingObject.offset.right,
      movingObject.position_y + movingObject.offset.top,
      movingObject.width - movingObject.offset.left,
      movingObject.height - movingObject.offset.bottom
    );
    this.ctx.stroke();
    }
  }

  /**
   * runs functions for checking hitbox between character & other objects
   */
  run() {
    this.checkHitboxCharacterEnemy();
    this.checkHitboxCharacterCollectable();
  }

  /**
   * checks if character jumps on enemy or is getting hit by enemy
   */
  checkHitboxCharacterEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead()) return;
      else {
        if (this.character.fallVelocity < 0 && this.character.jumpsOnEnemy(enemy) && !(enemy instanceof Endboss)) {
         this.character.jump(5);
        enemy.hit(100);
        } else {
          if(this.character.isColliding(enemy)) {
          this.character.hit(1);
          this.level.statusbar[0].setPercentage(0, this.character.health);
          }
        }
      }
    });
  }

  /**
   * runs functions to check if character hits collectable items
   */
  checkHitboxCharacterCollectable() {
    this.checkCoin();
    this.checkBottle();
  }

  /**
   * checks if character collects a coin and sums up the amount
   */
  checkCoin() {
    this.level.coin.forEach((coin) => {
      if(this.character.isColliding(coin)) {
        this.character.collectCollectable(0, coin.taken);
        coin.disappear();
        coin.taken = true;
        this.level.statusbar[2].setPercentage(2, Math.round((this.character.sumCollected[0] / coin.collectable) * 100));
        coin.stopInterval(coin.setIntervalIdArray[0]);
      }
    })
  }

  /**
   * checks if character collects a flask and sums up the amount
   */
  checkBottle() {
    this.level.tabasko.forEach((bottle) => {
      if(this.character.isColliding(bottle)) {
        this.character.collectCollectable(1, bottle.taken);
        bottle.disappear();
        if(!bottle.taken) this.collectedBottle.push(bottle);
        bottle.taken = true;
        this.level.statusbar[1].setPercentage(1, Math.round((this.character.sumCollected[1] / bottle.collectable) * 100));
      }
    })
  }

  /**
   * checks if player has enough flasks and send them forward
   */
  throwBottle() {
    if(this.collectedBottle.length == 0 || this.cooldown()) return;
    const bottle = this.collectedBottle.shift();
    bottle.throwTabasko();
    this.character.sumCollected[1]--;
    this.level.statusbar[1].setPercentage(1, Math.round((this.character.sumCollected[1] / bottle.collectable) * 100));
    this.intervalIdCollection(() => this.hitEnemy(), 1000 / 60);
    this.lastThrown = new Date().getTime();
  }

  /**
   * adds a cooldown for throwing bottles
   */
  cooldown() {
    let timePassed = new Date().getTime() - this.lastThrown;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * checks if enemy touches the hitbox of a thrown flask
   */
  hitEnemy() {
    this.level.tabasko.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if(enemy.isColliding(bottle) && bottle.isThrown && !bottle.touchEnemy && !enemy.isDead() && enemy.isVulnerable()) {
          if(enemy instanceof Endboss) {
            enemy.hit(34);
            this.level.statusbar[3].setPercentage(3, Math.round((enemy.health / 100) * 100)); 
          }
          else enemy.hit(100);
          bottle.touchEnemy = true;
        }
      })
    })
  }

  /**
   * initialises specific objects and its functions to the world to use
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
      if(enemy instanceof SmallChicken) {
        enemy.intervalIdCollection(() => enemy.actions(), 1000 / 60);
      };
    });
    this.level.tabasko.forEach((bottle) => {
      bottle.world = this;
    });
  }

  setOverlay() {
    this.overlay.world = this;
  }
}
