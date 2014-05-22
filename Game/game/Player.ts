class Player extends ex.Actor {
   public isColliding = false;
   public inAir = false;
   private _gallopTimer: number = Config.gallopDelay;

   constructor(x?: number, y?: number, color?: ex.Color) {
      super(x, y, Config.playerWidth, Config.playerHeight, color);      
   }



   public onInitialize(game: ex.Engine) {

      this.addEventListener('up', () => {
         if (!this.inAir) {
            this.dy -= Config.playerJumpSpeed;
            this.inAir = true;            
         }
      });

      this.on('collision', (ev: ex.CollisionEvent) => {
         if (ev.other instanceof Obstacle) {
            //game.goToScene("defeat");
            this.color = ex.Color.Magenta;
         }
         if (ev.side === ex.Side.Bottom) {
            this.isColliding = true;

            if (this.inAir) {
               // leaping animation
               this._gallopTimer = 0;
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
   }

   public update(engine: ex.Engine, delta: number) {
      super.update(engine, delta);

      if (this._gallopTimer <= 0 && !this.inAir) {
         Resources.SoundGallop.play();
         this._gallopTimer = Config.gallopDelay;
      }
      this._gallopTimer -= delta;

      if (!this.isColliding) {
         this.ay = Config.gravity;
      } else {
         this.ay = 0;
      }
      this.isColliding = false;
   }
}