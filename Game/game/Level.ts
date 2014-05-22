class Level extends ex.Scene {
   public obstacleLocations: number[];
   public obstacles: Obstacle[] = [];

   constructor(obstacleLocations: number[]) {
      super();
      this.obstacleLocations = obstacleLocations;
   }

   public onInitialize(engine: ex.Engine) {

      // bg
      var startScreen = new ex.Actor(game.width / 2, game.height / 2, game.width, game.height);
      startScreen.addDrawing("background", new ex.Sprite(Resources.TextureBackground, 0, 0, game.width, game.height));
      startScreen.collisionType = ex.CollisionType.PreventCollision;
      this.addChild(startScreen);

      // moon
      moon.dx = Config.moonSpeed;
      this.add(moon);      

      // mountains
      Parallax.create(this, 0, 0, game.width, game.height, Resources.TextureMountains, Config.mountainSpeed);

      // fence
      Parallax.create(this, 0, 0, game.width, game.height, Resources.TextureFence, -Config.playerMovementSpeed);      

      // ground
      var floor = new ex.Actor(0, Config.obstacleYPosition, game.width, 60, ex.Color.fromHex("#0f1722"));
      floor.anchor.x = floor.anchor.y = 0;
      floor.collisionType = ex.CollisionType.Fixed;
      this.addChild(floor);

      // obstacles
      for (var i = 0; i < obstacleLocations.length; i++) {
         var obstacle = new Obstacle(obstacleLocations[i], Config.obstacleYPosition);
         this.obstacles.push(obstacle);
         this.addChild(obstacle);
      }

      var horseSpriteSheet = new ex.SpriteSheet(Resources.TextureHorse, 14, 1, 400, 281);
      var horseAnimRed = horseSpriteSheet.getAnimationForAll(game, 35);
      var horseAnimGray = horseSpriteSheet.getAnimationForAll(game, 35);
      horseAnimRed.loop = true;
      horseAnimRed.setScaleX(.5);
      horseAnimRed.setScaleY(.5);

      horseAnimGray.loop = true;
      horseAnimGray.setScaleX(.5);
      horseAnimGray.setScaleY(.5);

      horseAnimRed.addEffect(new ex.Effects.Colorize(ex.Color.fromHex("#151515")));
      horseAnimGray.addEffect(new ex.Effects.Colorize(ex.Color.fromHex("#39465a")));

      // headless horseman
      var horseman = new Enemy(Config.horsemanXPos, Config.horsemanYPos, ex.Color.Red);
      horseman.addDrawing("default", horseAnimRed);
      this.addChild(horseman);

      // player
      var ichabod = new Player(Config.playerXPos, Config.playerYPos, ex.Color.Blue);
      ichabod.setCenterDrawing(true);
      ichabod.setWidth(100);
      ichabod.collisionType = ex.CollisionType.PreventCollision;
      ichabod.addDrawing("default", horseAnimGray);
      this.addChild(ichabod);

      var victoryTrigger = new ParallaxTrigger(15000, Config.obstacleYPosition, 50, 200, () => {
         game.goToScene("victory");
      }, -Config.playerMovementSpeed);
      victoryTrigger.repeats = -1;
      victoryTrigger.target = ichabod;
      game.addChild(victoryTrigger);

      //var camera = new ex.SideCamera(game);
      //var camera = new ModifiedCamera(game);
      //camera.setActorToFollow(ichabod);
      //game.camera = camera;

   }

}