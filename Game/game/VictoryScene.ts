class VictoryScene extends ex.Scene {

   constructor() {
      super();
   }

   public onInitialize(engine: ex.Engine): void {
      super.onInitialize(engine);

      game.camera = new ex.BaseCamera(engine);

      var labelVictory = new ex.Label("you have escaped from the headless horseman", game.getWidth() / 2, game.getHeight() / 2, '50px Segoe UI');
      labelVictory.color = ex.Color.White;
      this.addChild(labelVictory);

      var victory = new ex.Actor(0, 0, engine.canvas.width, engine.canvas.height);
      game.addChild(victory);
      game.camera.setActorToFollow(victory);
   }
}