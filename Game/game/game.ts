/// <reference path="../scripts/Excalibur.d.ts" />
/// <reference path="Config.ts" />
/// <reference path="Level.ts" />
/// <reference path="Obstacle.ts" />
/// <reference path="Player.ts" />
/// <reference path="VictoryScene.ts" />
/// <reference path="DefeatScene.ts" />
/// <reference path="Resources.ts"/>

var logger = ex.Logger.getInstance();

var statsProgress;

var game = new ex.Engine(960, 600, "game");
game.setAntialiasing(false);
game.backgroundColor = ex.Color.Black;

game.addEventListener('keydown', (keyDown?: ex.KeyDown) => {

   if (keyDown.key === ex.InputKey.D) {
      game.isDebug = !game.isDebug;
   }
});

var loader = new ex.Loader();

for (var key in Resources) {
   if (Resources.hasOwnProperty(key)) {
      loader.addResource(Resources[key]);
   }
}

var obstacleLocations = [2000, 3000, 3400, 3800, 4600, 4950, 5900, 6200, 6600, 8400, 9400, 9900, 10300, 10800, 11100, 11900, 12400, 12800, 13200, 13600, 14000];
var mainLevel = new Level(obstacleLocations);
var moon = new ex.Actor(500, 0, 471, 152);
moon.collisionType = ex.CollisionType.PreventCollision;
moon.addDrawing("default", new ex.Sprite(Resources.TextureMoon, 0, 0, 471, 152));
moon.anchor.x = moon.anchor.y = 0;
moon.dx = -1;

var logo: ex.Actor;
var tree: ex.Actor;

var startGame = () => {
   if (game.currentScene !== mainLevel) {
      game.off("keyup", startGame);

      game.goToScene("level");
   }
}

game.start(loader).then(() => {

   Resources.SoundWind.setLoop(true);
   Resources.SoundWind.play();
   Resources.SoundIntro.play();

   var startScreen = new ex.Actor(game.width / 2, game.height / 2, game.width, game.height);
   startScreen.addDrawing("background", new ex.Sprite(Resources.TextureBackground, 0, 0, game.width, game.height));
   startScreen.collisionType = ex.CollisionType.PreventCollision;
   game.addChild(startScreen);



   // moon
   game.add(moon);

   // mountains
   Parallax.create(game.currentScene, 0, 0, game.width, game.height, Resources.TextureMountains, 0);

   // tree
   tree = new ex.Actor(300, Config.obstacleYPosition + 15, 385, 519);
   tree.anchor.y = 1;
   tree.collisionType = ex.CollisionType.PreventCollision;
   tree.addDrawing("default", new ex.Sprite(Resources.TextureTree1, 0, 0, 385, 519));
   game.add(tree);

   // fence
   Parallax.create(game.currentScene, 0, 0, game.width, game.height, Resources.TextureFence, 0);

   // ground
   var ground = new ex.Actor(0, Config.obstacleYPosition, game.width, 60, ex.Color.fromHex("#0f1722"));
   ground.anchor.x = ground.anchor.y = 0;
   ground.collisionType = ex.CollisionType.Fixed;
   game.add(ground);

   logo = new ex.Actor(game.width / 2, game.height / 2, game.width, game.height);   
   logo.addDrawing("logo", new ex.Sprite(Resources.TextureLogo, -400, -300, game.width, game.height));
   logo.collisionType = ex.CollisionType.PreventCollision;
   game.addChild(logo);

   var emitter = new ex.ParticleEmitter(0, Config.obstacleYPosition, 960, 0);
   emitter.emitterType = ex.EmitterType.Rectangle;
   emitter.radius = 5;
   emitter.minVel = 3;
   emitter.maxVel = 56;
   emitter.minAngle = 0;
   emitter.maxAngle = 6.2;
   emitter.isEmitting = true;
   emitter.emitRate = 10;
   emitter.opacity = 0.005;
   emitter.fadeFlag = true;
   emitter.particleLife = 4000;
   emitter.maxSize = 200;
   emitter.minSize = 133;
   //emitter.startSize = 11;
   //emitter.endSize = 200;
   emitter.acceleration = new ex.Vector(0, 0);
   emitter.beginColor = new ex.Color(255, 255, 255, 0.005);
   emitter.endColor = new ex.Color(255, 255, 255, 0);
   game.add(emitter);

   game.addScene("level", mainLevel);
   game.addScene("victory", new VictoryScene());

   game.on("keyup", startGame);
});