﻿/// <reference path="../scripts/Excalibur.d.ts" />
/// <reference path="Config.ts" />
/// <reference path="Level.ts" />
/// <reference path="Obstacle.ts" />
/// <reference path="Player.ts" />
/// <reference path="VictoryScene.ts" />
/// <reference path="DefeatScene.ts" />
/// <reference path="Resources.ts"/>

var logger = ex.Logger.getInstance();

var game = new ex.Engine(960, 600, "game");
game.setAntialiasing(false);
game.backgroundColor = ex.Color.Black;

var loader = new ex.Loader();

for (var key in Resources) {
   if (Resources.hasOwnProperty(key)) {
      loader.addResource(Resources[key]);
   }
}

//game.isDebug = true;

var obstacleLocations = [200, -800, -1200, -1600, -2200, -2550, -3500, -3800, -4200, -6000, -7000, -7500, -7880, -8400, -8700, -9500 -10000, -10300, -10600, -10900, -11200];
var mainLevel = new Level(obstacleLocations);

var startGame = () => {
   //if (game.currentScene !== mainLevel) {
   //   game.off("keyup", startGame);
      // todo
      // bg
      // moon
      // mountains
      // fence
      // ground

      game.addScene("level", mainLevel);
      game.addScene("victory", new VictoryScene());
      game.addScene("defeat", new DefeatScene());

      game.on("keyup", startGame);
      game.goToScene("level");
   //}
}

game.start(loader).then(() => {
   //game.on("keyup", startGame);
   game.addScene("level", mainLevel);
   game.addScene("victory", new VictoryScene());
   game.addScene("defeat", new DefeatScene());

   //game.on("keyup", startGame);
   game.goToScene("level");
});