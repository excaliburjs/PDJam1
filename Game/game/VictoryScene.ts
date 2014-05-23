class VictoryScene extends ex.Scene {

   constructor() {
      super();
   }

   public onInitialize(engine: ex.Engine): void {
      super.onInitialize(engine);

      game.camera = new ex.BaseCamera(engine);

      var victory = new ex.Actor(0, 0, engine.canvas.width, engine.canvas.height);
      game.addChild(victory);
      game.camera.setActorToFollow(victory);

      var labelVictory = new ex.Label("Victory", game.getWidth() / 2, 100, '50px Architects Daughter');
      labelVictory.color = ex.Color.White;
      labelVictory.textAlign = ex.TextAlign.Center;
      this.addChild(labelVictory);

      var labelVictoryStory1 = new ex.Label("Ichabod spurred old Gunpowder onward a final time.", 50, 200, '25px Architects Daughter');
      labelVictoryStory1.color = ex.Color.White;
      this.addChild(labelVictoryStory1);

      var labelVictoryStory2 = new ex.Label("All at once, horse and rider clattered across the old bridge.", 50, 240, '25px Architects Daughter');
      labelVictoryStory2.color = ex.Color.White;
      this.addChild(labelVictoryStory2);

      var labelVictoryStory3 = new ex.Label("For a moment, he imagined himself safe.", 50, 280, '25px Architects Daughter');
      labelVictoryStory3.color = ex.Color.White;
      this.addChild(labelVictoryStory3);
   }
}