class ModifiedCamera extends ex.SideCamera {


   getFocus() {
      if (this.follow) {
         return new ex.Point(((-this.follow.x) * this.getZoom()) + (this.engine.getWidth() * this.getZoom()) / 2.0, 0 + Config.cameraOffset);
      } else {
         return this.focus;
      }
   }


} 