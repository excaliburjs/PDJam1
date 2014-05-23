class DefeatScene extends ex.Scene {
   public distanceTravelled: number;


   constructor(distance: number) {
      super();
      this.distanceTravelled = distance;
   }

   public onInitialize(engine: ex.Engine): void {
      super.onInitialize(engine);

      var defeatScreen = new ex.Actor(game.width / 2, game.height / 2, game.width, game.height);
      defeatScreen.addDrawing("background", new ex.Sprite(Resources.TextureBackground, 0, 0, game.width, game.height));
      defeatScreen.collisionType = ex.CollisionType.PreventCollision;
      game.camera.setActorToFollow(defeatScreen);
      game.addChild(defeatScreen);

      game.camera = new ex.BaseCamera(engine);

      var w = game.getWidth() / 2;

      var labelDefeat = new ex.Label("Defeat", w, 100, '50px Architects Daughter');
      labelDefeat.color = ex.Color.Red;
      labelDefeat.textAlign = ex.TextAlign.Center;
      this.addChild(labelDefeat);

      var labelDefeatStory1 = new ex.Label("A rock rose up from the path, and Ichabod was thrown", 50, 200, '25px Architects Daughter');
      labelDefeatStory1.color = ex.Color.White;
      this.addChild(labelDefeatStory1);

      var labelDefeatStory2 = new ex.Label("from the back of old Gunpowder. As he lay there on", 50, 240, '25px Architects Daughter');
      labelDefeatStory2.color = ex.Color.White;
      this.addChild(labelDefeatStory2);

      var labelDefeatStory3 = new ex.Label("the ground, he felt darkness overtake his senses.", 50, 280, '25px Architects Daughter');
      labelDefeatStory3.color = ex.Color.White;
      this.addChild(labelDefeatStory3);

      //var distance = new ex.Label("distance: " + this.distanceTravelled, game.getWidth() / 2, 300 + game.getHeight() / 2, '50px Segoe UI');
      //distance.color = ex.Color.White;
      //this.addChild(distance);

      //this.on("keyup", (ev: ex.KeyUp) => {
      //   window.location.reload()
      //});

   }
}