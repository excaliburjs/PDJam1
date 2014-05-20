class Enemy extends ex.Actor {
   public isColliding = false;

   constructor(x?: number, y?: number, color?: ex.Color) {
      super(x, y, Config.horsemanWidth, Config.horsemanHeight, color);
   }

   public onInitialize(game: ex.Engine) {
      this.dx = Config.playerMovementSpeed;
      this.collisionType = ex.CollisionType.Passive;
   }
}