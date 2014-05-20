class Player extends ex.Actor {
   public isColliding = false;
   public inAir = false;

   constructor(x?: number, y?: number, color?: ex.Color) {
      super(x, y, Config.playerWidth, Config.playerHeight, color);
   }

   public onInitialize(game: ex.Engine) {
      this.dx = Config.playerMovementSpeed;

      
      this.addEventListener('up', () => {
         if (!this.inAir) {
            this.dy -= Config.playerJumpSpeed;
            this.inAir = true;
         }
      });

      this.on('collision', (ev: ex.CollisionEvent) => {
         if (ev.other instanceof Obstacle) {
            game.goToScene("defeat");
            //this.color = ex.Color.Magenta;
         }
         if (ev.side === ex.Side.Bottom) {
            this.isColliding = true;

            if (this.inAir) {
               // leaping animation
            }
            this.inAir = false;
            if (ev.other) {
               this.dy = ev.other.dy;
            } else {
               this.dy = 0;
            }
         }
         if (ev.side === ex.Side.Top) {
            if (ev.other) {
               this.dy = ev.other.dy - this.dy;
            } else {
               this.dy = 0;
            }
         }
      });

      this.on('update', (ev: ex.UpdateEvent) => {
         if (!this.isColliding) {
            ev.target.ay = Config.gravity;
         } else {
            ev.target.ay = 0;
         }
         this.isColliding = false;
      });
   }

}