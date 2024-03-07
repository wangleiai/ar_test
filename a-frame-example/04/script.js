AFRAME.registerComponent("ar-hit-test-done", {
    init: function () {
      const message = document.getElementById("dom-overlay-message");
      let el = this.el;
  
      // Hit testing is available
      this.el.sceneEl.addEventListener(
        "ar-hit-test-start",
        function () {
          message.textContent = `Scanning environment`;
        },
        // { once: true }
      );
  
      // Has managed to start doing hit testing
      this.el.sceneEl.addEventListener(
        "ar-hit-test-achieved",
        function () {
          message.textContent = `Tap on the screen to place the object`;
        },
        // { once: true }
      );
  
      this.el.sceneEl.addEventListener("ar-hit-test-select", function (e) {
  //       console.log(e);
  //       let position = e.detail.position;
  //       let objectToShow = document.getElementById("object-to-show");
  //       objectToShow.setAttribute("position", position);
  //       objectToShow.setAttribute("visible", true);
  //       message.textContent = "Object placed successfully";
  
  //       console.log("this.el.sceneEl ", el.sceneEl);
        
        
            const scene =document.querySelector("a-scene")
        console.log(e);
        let position = e.detail.position;
        let objectToShow = document.getElementById("object-to-show");
        let clonedObject = objectToShow.cloneNode(true)
        clonedObject.setAttribute("id", "object-to-show_" );  // need unique id
        clonedObject.setAttribute("position", position);
        clonedObject.setAttribute("visible", true);
        message.textContent = "Object placed successfully "
        scene.appendChild(clonedObject)
        console.log("this.el.sceneEl ", el.sceneEl);
      });
    },
    
    // remove: function() {
    //   this.el.removeEventListener('click', this.toggleColor);
    // }
  });
  