class DefeatScene extends ex.Scene {

   constructor() {
      super();
   }

   public onInitialize(engine: ex.Engine): void {
      super.onInitialize(engine);

      var labelDefeat = new ex.Label("you lose", game.getWidth() / 2, game.getHeight() / 2, '50px Segoe UI');
      labelDefeat.color = ex.Color.White;
      this.addChild(labelDefeat);

      var death = new ex.Actor(0, 0, engine.canvas.width, engine.canvas.height);
      game.addChild(death);
   }
}