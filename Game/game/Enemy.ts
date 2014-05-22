class Enemy extends ex.Actor {
   public isColliding = false;
   private _dustEmitter1: ex.ParticleEmitter;
   private _dustEmitter2: ex.ParticleEmitter;

   constructor(x?: number, y?: number, color?: ex.Color) {
      super(x, y, Config.horsemanWidth, Config.horsemanHeight, color);
   }

   public onInitialize(game: ex.Engine) {
      this.dx = Config.horsemanInitialSpeed;
      this.collisionType = ex.CollisionType.Passive;
      this._dustEmitter1 = this.createDustEmitter(-this.getWidth() / 2, this.getHeight() / 2);
      this._dustEmitter2 = this.createDustEmitter(this.getWidth() / 2, this.getHeight() / 2);
      this.addChild(this._dustEmitter1);
      this.addChild(this._dustEmitter2);

      this.on('update', (ev: ex.UpdateEvent) => {
         this.dx += Config.horsemanSpeedIncrease;
      });
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
      emitter.isEmitting = true;
      emitter.particleLife = 334;
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