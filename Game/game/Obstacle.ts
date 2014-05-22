class Obstacle extends ex.Actor {

   constructor(x?: number, y?: number) {
      super(x, y, Config.obstacleWidth, Config.obstacleHeight - Config.obstableOffsetHeight);
      this.anchor.x = 0;
      this.anchor.y = 1;
      this.addDrawing("rock", new ex.Sprite(Resources.TextureRock1, 0, 0, Config.obstacleWidth, Config.obstacleHeight));
   }

   public onInitialize(game: ex.Engine) {
      this.collisionType = ex.CollisionType.Fixed;
      this.dx = -Config.playerMovementSpeed;
   }
}