class Level extends ex.Scene {
   public obstacleLocations: number[];
   public obstacles: Obstacle[] = [];

   constructor(obstacleLocations: number[]) {
      super();
      this.obstacleLocations = obstacleLocations;
   }

   public onInitialize(engine: ex.Engine) {

      // obstacles
      for (var i = 0; i < obstacleLocations.length; i++) {
         var obstacle = new Obstacle(obstacleLocations[i], Config.obstacleYPosition, Config.obstacleColor);
         this.obstacles.push(obstacle);
         this.addChild(obstacle);
      }

      // ground
      var floor = new ex.Actor(200, Config.obstacleYPosition, 25000, 10, ex.Color.Green);
      floor.collisionType = ex.CollisionType.Fixed;
      this.addChild(floor);

      // player
      var yPos = 270;//Config.obstacleYPosition - Config.playerHeight / 2;
      var ichabod = new Player(Config.playerXPos, yPos, ex.Color.Blue);
      this.addChild(ichabod);

      //var camera = new ex.SideCamera(game);
      var camera = new ModifiedCamera(game);
      camera.setActorToFollow(ichabod);
      game.camera = camera;

      var horsemanYPos = Config.obstacleYPosition - Config.horsemanHeight / 2;
      var horseman = new Enemy(Config.horsemanXPos, horsemanYPos, ex.Color.Red);
      //horseman.follow(ichabod, Config.startingFollowDistance);
      this.addChild(horseman);
   }

}