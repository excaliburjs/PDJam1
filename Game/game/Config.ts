class Config {

   static gravity: number = 800;
   static cameraOffset: number = 150;

   // parallax background
   static moonSpeed = -3;
   static mountainSpeed = -30;
   
   // obstacles
   static obstacleWidth: number = 50;
   static obstacleHeight: number = 30;
   static obstableOffsetHeight: number = 5;
   static obstacleColor: ex.Color = ex.Color.Orange;
   static obstacleYPosition: number = 600 - 55;

   // the player
   static playerWidth: number = 150;
   static playerHeight: number = 150;
   static playerMovementSpeed: number = 350;
   static playerJumpSpeed: number = 330;
   static playerXPos: number = 960 / 2;
   static gallopDelay: number = 600;
   static playerYPos: number = Config.obstacleYPosition - Config.playerHeight / 2;
   
   // the headless horseman
   static horsemanWidth: number = 150;
   static horsemanHeight: number = 150;
   static horsemanXPos: number = 0;
   static horsemanYPos: number = Config.obstacleYPosition - Config.horsemanHeight / 2;
   static horsemanSpeedIncrease: number = 0.005;
   static horsemanInitialSpeed = 1;
}