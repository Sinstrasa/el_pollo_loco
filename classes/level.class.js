class Level {
  enemies;
  clouds;
  background;
  coin;
  tabasko;
  level_end_x = 2249;

  constructor(enemy, cloud, coins, tabasko, background) {
    this.enemies = enemy;
    this.clouds = cloud;
    this.coin = coins;
    this.tabasko = tabasko;
    this.background = background;
  }
}
