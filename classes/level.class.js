class Level {
  enemies;
  clouds;
  background;
  level_end_x = 2249;

  constructor(enemy, cloud, background) {
    this.enemies = enemy;
    this.clouds = cloud;
    this.background = background;
  }
}
