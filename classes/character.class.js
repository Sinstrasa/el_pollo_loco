class Character extends MovableObject {
  world;
  IMAGES_WALKING = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  constructor() {
    super().loadImage("assets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.animate(15, this.IMAGES_WALKING);
  }

  animate(frame, array) {
    setInterval(() => {
      if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(array);
      }
    }, 1000 / frame);
    this.moveCharacter();
  }

  moveCharacter() {
    setInterval(() => {
      if(this.world.keyboard.RIGHT && this.position_x < this.world.level.level_end_x) {
        this.moveRight(7);
      }
      if(this.world.keyboard.LEFT && this.position_x > -616) {
        this.moveLeft(7);
      }
      this.world.camera_x = -this.position_x + 100;
    }, 1000 / 60);
  }

  jump() {}
}
