/// <reference path="../scripts/Excalibur.d.ts" />
/// <reference path="Config.ts" />
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

game.start(loader).then(() => {
   logger.info("All Resources have finished loading");

   // todo
   // bg
   // moon
   // mountains
   // fence
   // ground

   var ichabod = new Player(900, 300, ex.Color.Blue);

   var horseman = new Enemy(1100, 300, ex.Color.Red);
   game.addChild(horseman);

   var floor = new ex.Actor(200, 350, 10000, 10, ex.Color.Green);
   floor.collisionType = ex.CollisionType.Fixed;
   game.addChild(floor);

   var testRock1 = new Obstacle(700, 350, ex.Color.Orange);
   testRock1.collisionType = ex.CollisionType.Fixed;
   game.addChild(testRock1);

   var testRock2 = new Obstacle(500, 350, ex.Color.Orange);
   testRock2.collisionType = ex.CollisionType.Fixed;
   game.addChild(testRock2);

   var testRock3 = new Obstacle(200, 350, ex.Color.Orange);
   testRock3.collisionType = ex.CollisionType.Fixed;
   game.addChild(testRock3);

   var camera = new ex.SideCamera(game);
   camera.setActorToFollow(ichabod);
   game.camera = camera;

   game.addChild(ichabod);

   game.addScene("victory", new VictoryScene());
   game.addScene("defeat", new DefeatScene());   
});