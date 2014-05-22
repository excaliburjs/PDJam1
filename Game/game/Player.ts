class Player extends ex.Actor {
   public isColliding = false;
   public inAir = false;
   private _gallopTimer: number = Config.gallopDelay;
   private _dustEmitter1: ex.ParticleEmitter;
   private _dustEmitter2: ex.ParticleEmitter;

   constructor(x?: number, y?: number, color?: ex.Color) {
      super(x, y, Config.playerWidth, Config.playerHeight, color);      
   }

   public onInitialize(game: ex.Engine) {

      this.collisionType = ex.CollisionType.Active;

      // dust
      this._dustEmitter1 = this.createDustEmitter(-this.getWidth()/2, this.getHeight()/2);
      this._dustEmitter2 = this.createDustEmitter(this.getWidth() / 2, this.getHeight() / 2);
      this.addChild(this._dustEmitter1);
      this.addChild(this._dustEmitter2);

      this.addEventListener('up', () => {
         if (!this.inAir) {
            this.dy -= Config.playerJumpSpeed;
            this.inAir = true;   
            this._dustEmitter1.isEmitting = false;
            this._dustEmitter2.isEmitting = false;         
         }
      });

      this.on('collision', (ev: ex.CollisionEvent) => {
         if (ev.other instanceof Obstacle) {
            game.addScene("defeat", new DefeatScene(statsProgress));
            game.goToScene("defeat");
            //this.color = ex.Color.Magenta;
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

      if (!this.inAir) {
         this._dustEmitter1.isEmitting = true;
         this._dustEmitter2.isEmitting = true;
      }

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

   private createDustEmitter(x, y): ex.ParticleEmitter {
      var emitter = new ex.ParticleEmitter(x, y, 9, 0);
      emitter.emitterType = ex.EmitterType.Rectangle;
      emitter.radius = 5;
      emitter.minVel = 3;
      emitter.maxVel = 56;
      emitter.minAngle = 5.1;
      emitter.maxAngle = 3.9;      
      emitter.emitRate = 9;
      emitter.opacity = 0.09;
      emitter.fadeFlag = true;
      emitter.particleLife = 600;
      emitter.maxSize = 1;
      emitter.minSize = 1;
      emitter.startSize = 1;
      emitter.endSize = 9;
      emitter.acceleration = new ex.Vector(-450, 0);
      emitter.beginColor = ex.Color.Transparent;
      emitter.endColor = ex.Color.Transparent;
      
      return emitter;
   }
}