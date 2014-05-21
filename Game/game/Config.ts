class Config {

   static gravity: number = 800;
   static cameraOffset: number = 150;

   // obstacles
   static obstacleWidth: number = 50;
   static obstacleHeight: number = 50;
   static obstacleColor: ex.Color = ex.Color.Orange;
   static obstacleYPosition: number = 350;

   // the player
   static playerWidth: number = 150;
   static playerHeight: number = 150;
   static playerMovementSpeed: number = -350;
   static playerJumpSpeed: number = 330;
   static playerXPos: number = 900;
   //static playerYPos: number = Config.obstacleYPosition-5;
   
   // the headless horseman
   static horsemanWidth: number = 150;
   static horsemanHeight: number = 150;
   static horsemanXPos: number = 1400;
   static horsemanSpeedIncrease: number = -0.01;
   //static startingFollowDistance: number = 200; //doesn't work, following in the y direction also, so shudders around

   

}