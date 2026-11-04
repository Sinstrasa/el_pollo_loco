class Level {
  enemies;
  clouds;
  background;
  coin;
  tabasko;
  statusbar;
  level_end_x = 2249;

  constructor(enemy, statusbars, cloud, coins, tabasko, background) {
    this.enemies = enemy;
    this.statusbar = statusbars;
    this.clouds = cloud;
    this.coin = coins;
    this.tabasko = tabasko;
    this.background = background;
  }
}
