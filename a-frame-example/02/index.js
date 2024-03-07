window.addEventListener("DOMContentLoaded", function () {
	const sceneEl = document.querySelector("a-scene");
	const badger = document.getElementById("badger");
	const car = document.getElementById("car");
	const arParent = document.getElementById("objects");
	const reticleBox = document.getElementById("reticle_box");
  
	var surfaceDetetcted = false;
	var objPlaced = false;
  
	sceneEl.addEventListener("enter-vr", function () {
	  if (this.is("ar-mode")) {
		// Entered AR
		//message.textContent = "";
  
		// Hit testing is available
		this.addEventListener(
		  "ar-hit-test-start",
		  function () {
			//message.innerHTML = `Scanning environment, finding surface.`;
		  },
		  { once: true }
		);
  
		// Has managed to start doing hit testing
		this.addEventListener(
		  "ar-hit-test-achieved",
		  function () {
			surfaceDetetcted = true;
			//sceneEl.components.arcursor.onselect();
			console.log("arhit achieved");
			//message.innerHTML = `Select the location to place<br />By tapping on the screen or selecting with your controller.`;
		  },
		  { once: true }
		);
  
		// User has placed an object
		this.addEventListener(
		  "ar-hit-test-select",
		  function () {
			car.setAttribute("scale", "0.01 0.01 0.01");
			badger.setAttribute("scale", "0.01 0.01 0.01");
  
			car.setAttribute("visible", "true");
			badger.setAttribute("visible", "true");
			reticleBox.setAttribute("scale", "0 0 0");
			setTimeout(TurnOffHit,2000);
		  },
		  { once: true }
		);
	  }
	});
  
	function TurnOffHit() {
	  sceneEl.setAttribute(
		"ar-hit-test",
		"enabled:false;"
	  );
	}
	
  });
  