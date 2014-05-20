class VictoryScene extends ex.Scene {

   constructor() {
      super();
   }

   public onInitialize(engine: ex.Engine): void {
      super.onInitialize(engine);

      var labelVictory = new ex.Label("you have escaped from the headless horseman");
      this.addChild(labelVictory);
   }
}