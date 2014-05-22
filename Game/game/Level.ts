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
      Parallax.create(this, 700, 0, game.width, game.height, Resources.TextureMoon, Config.moonSpeed);      

      // mountains
      Parallax.create(this, 0, 0, game.width, game.height, Resources.TextureMountains, Config.mountainSpeed);

      // fence
      Parallax.create(this, 0, 0, game.width, game.height, Resources.TextureFence, -Config.playerMovementSpeed);      

      // obstacles
      for (var i = 0; i < obstacleLocations.length; i++) {
         var obstacle = new Obstacle(obstacleLocations[i], Config.obstacleYPosition, Config.obstacleColor);
         this.obstacles.push(obstacle);
         this.addChild(obstacle);
      }

      // ground
      var floor = new ex.Actor(0, Config.obstacleYPosition, 960, 10, ex.Color.Green);
      floor.anchor.x = floor.anchor.y = 0;
      floor.collisionType = ex.CollisionType.Fixed;
      this.addChild(floor);

      // headless horseman
      var horsemanYPos = Config.obstacleYPosition - Config.horsemanHeight / 2;
      var horseman = new Enemy(Config.horsemanXPos, horsemanYPos, ex.Color.Red);
      this.addChild(horseman);

      // player
      var yPos = 270;//Config.obstacleYPosition - Config.playerHeight / 2;
      var ichabod = new Player(Config.playerXPos, yPos, ex.Color.Blue);
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