class Statusbar extends DrawableObject {
  width = 160;
  height = 50;
  percentage = 100;
  IMAGES_HEALTH = [
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];
  IMAGES_COIN = [
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];
  IMAGES_TABASKO = [
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];
  IMAGES_ENDBOSS = [
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  constructor(asset, index, percentage, position_x, position_y) {
    super().loadImage(asset);
    this.loadSprites();
    this.position_x = position_x;
    this.position_y = position_y;
    this.setPercentage(index, percentage);
  }

  loadSprites() {
    this.loadImages(this.IMAGES_HEALTH);
    this.loadImages(this.IMAGES_COIN);
    this.loadImages(this.IMAGES_TABASKO);
    this.loadImages(this.IMAGES_ENDBOSS);
  }

  setPercentage(index, percentage) {
    this.percentage = percentage;
    let path = this.indexToAsset(index)[this.resolveImageIndex()];
    this.image = this.imageCache[path];
  }

  indexToAsset(index) {
    switch (index) {
      case 3:
        return this.IMAGES_ENDBOSS;
      case 2:
        return this.IMAGES_TABASKO;
      case 1:
        return this.IMAGES_COIN;
      default:
        return this.IMAGES_HEALTH;
    }
  }

  resolveImageIndex() {
    return Math.round(this.percentage / 20);
  }
}
