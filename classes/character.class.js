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
    if(this.world.keyboard.RIGHT) {
      setInterval(() => {
      let index = this.currentImage % array.length;
      let path = array[index];
      this.image = this.imageCache[path];
      if (index == (array.length - 1)) this.currentImage = 0;
      else this.currentImage++;
    }, 1000 / frame);
    }
  }

  jump() {}
}
