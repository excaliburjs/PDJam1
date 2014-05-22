class Parallax {
   
   public static create(scene: ex.Scene, x: number, y: number, width: number, height: number, texture: ex.Texture, speed: number) {

      scene.add(new ParallaxActor(x, y, width, height, texture, speed));

      var x2 = speed > 0 ? -width : width;
      scene.add(new ParallaxActor(x2, y, width, height, texture, speed));
   }

}

class ParallaxActor extends ex.Actor {
   
   constructor(x: number, y: number, width: number, height: number, texture: ex.Texture, private speed: number) {
      super(x, y, width, height);
      this.anchor.x = this.anchor.y = 0;

      this.dx = speed;
      this.addDrawing("default", new ex.Sprite(texture, 0, 0, width, height));
      this.collisionType = ex.CollisionType.PreventCollision;
   }

   public update(engine: ex.Engine, delta: number) {
      if (this.isOffScreen) {
         this.x = this.speed > 0 ? this.x - (this.getWidth() * 2) : this.x + this.getWidth();
      }

      super.update(engine, delta);      
   }
} 

class ParallaxTrigger extends ex.Trigger {

   constructor(x: number, y: number, width: number, height: number, action: () => void, private speed: number) {
      super(x, y, width, height, action);
      this.repeats = -1;

      this.dx = speed;
   }
}