class Endboss extends MovableObject {
  position_x = 2500;
  position_y = 10;
  width = 350;
  height = 450;
  encounter = false;
  direction = true;
  deathAnimationStarted = false;
  offset = {top: 60, bottom: 70, left: 30, right: 20};
  IMAGES_WALK = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_HURT = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEATH = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * loads all relevant functions at the start
   */
  constructor() {
    super().loadImage("assets/img/4_enemie_boss_chicken/3_attack/G20.png");
    this.loadSprites();
    this.activateInterval();
  }

  /**
   * loads all relevant images and stores them
   */
  loadSprites() {
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEATH);
  }

  /**
   * runs all necessary functions as intervals
   */
  activateInterval() {
    this.intervalIdCollection(() => this.bossActivates(), 1000 / 7);
    this.intervalIdCollection(() => this.bossMoves(), 1000 / 60);
  }

  /**
   * plays the alert animation and then the moving animation
   */
  bossActivates() {
    if (this.encounter) {
      if (this.counter <= 10) {
        this.playAnimationOnce(this.IMAGES_ALERT);
        this.counter++;
      } else {
        this.playAnimation(this.IMAGES_WALK);
      }
    }
    if (this.world.character.position_x >= 2150 && !this.encounter) {
      this.counter = 0;
      this.encounter = true;
    }
  }

  /**
   * loads images fitting to the corresponding situation and moves them
   */
  bossMoves() {
    if (this.isDead()) {
      this.defeatedEndboss();
    } else {
      if (this.isHurt()) {
        this.hurtEndboss();
      } else {
        if (this.counter >= 10 && this.encounter) {
          this.checkDirection();
          this.moveDirection();
        } 
      }
    }
  }

  /**
   * checks if endboss is dying
   */
  defeatedEndboss() {
    if(this.isDead() && !this.deathAnimationStarted) {
      this.deathAnimationStarted = true;
      this.resetInterval();
      this.counter = 0;
      this.intervalIdCollection(() => this.deathAnimation(), 1000 / 10);
    }
  }

  /**
   * plays the death animation and ends the game
   */
  deathAnimation() {
    this.playAnimationOnce(this.IMAGES_DEATH);
    this.counter++;
    if (this.counter >= this.IMAGES_DEATH.length) {
      this.world.overlay.endscreen();
      this.stopGame();
    }
  }

  /**
   * plays the hurt animation
   */
  hurtEndboss() {
    this.resetInterval();
    this.setIntervalIdArray = [];
    this.intervalIdCollection(() => this.playAnimation(this.IMAGES_HURT), 1000 / 7);
    setTimeout(() => {
      this.stopInterval(this.setIntervalIdArray[0]);
      this.setIntervalIdArray.pop();
      this.activateInterval();
    }, 1000);
  }

  /**
   * checks if the endboss has reached specific borders
   */
  checkDirection() {
    if (this.position_x >= 2400) this.direction = true;
    if (this.position_x <= -900) this.direction = false;
  }

  /**
   * lets the endboss patroll
   */
  moveDirection() {
    if(this.direction) this.moveLeft(3.5);
    else this.moveRight(3.5);
  }

  /**
   * stops the current playing intervals of this class
   */
  resetInterval() {
    this.stopInterval(this.setIntervalIdArray[0]);
    this.stopInterval(this.setIntervalIdArray[1]);
  }
}
