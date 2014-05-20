class Obstacle extends ex.Actor {

   constructor(x?: number, y?: number, color?: ex.Color) {
      super(x, y, Config.obstacleWidth, Config.obstacleHeight, color);
   }

   public onInitialize(game: ex.Engine) {
      this.collisionType = ex.CollisionType.Fixed;
   }
}