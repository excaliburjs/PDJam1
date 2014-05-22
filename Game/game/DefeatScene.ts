class DefeatScene extends ex.Scene {
   public distanceTravelled: number;


   constructor(distance: number) {
      super();
      this.distanceTravelled = distance;
   }

   public onInitialize(engine: ex.Engine): void {
      super.onInitialize(engine);

      game.camera = new ex.BaseCamera(engine);

      var labelDefeat = new ex.Label("you lose", game.getWidth() / 2, game.getHeight() / 2, '50px Segoe UI');
      labelDefeat.color = ex.Color.White;
      this.addChild(labelDefeat);

      var distance = new ex.Label("distance: " + this.distanceTravelled, game.getWidth() / 2, 300 + game.getHeight() / 2, '50px Segoe UI');
      distance.color = ex.Color.White;
      this.addChild(distance);

      var death = new ex.Actor(0, 0, engine.canvas.width, engine.canvas.height);
      game.addChild(death);
      game.camera.setActorToFollow(death);

      //this.on("keyup", (ev: ex.KeyUp) => {
      //   window.location.reload()
      //});

   }
}