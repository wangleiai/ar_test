document.addEventListener("DOMContentLoaded", function () { const sceneEl = document.querySelector('a-scene'); });



class HitTest {
	constructor(renderer, options) {

		this.renderer = renderer;
		this.xrHitTestSource = null;

		renderer.xr.addEventListener("sessionend", () => this.xrHitTestSource = null);
		renderer.xr.addEventListener("sessionstart", () => this.sessionStart(options));
		
		if (this.renderer.xr.isPresenting) {
			this.sessionStart(options)
		}
	}

	async sessionStart(options) {
		console.log("options:", options)
		this.session = this.renderer.xr.getSession();
		
		if (options.space) {
			this.space = options.space;
			this.xrHitTestSource = await this.session.requestHitTestSource(options);
		} else if ( options.profile ) {
			this.transient = true;
			this.xrHitTestSource = await this.session.requestHitTestSourceForTransientInput(options);
		}
	}

	doHit(frame) {

		if (!this.renderer.xr.isPresenting) return;
		const refSpace = this.renderer.xr.getReferenceSpace();
		const xrViewerPose = frame.getViewerPose(refSpace);

		if (this.xrHitTestSource && xrViewerPose) {
			// console.log(1, xrViewerPose)
			if (this.transient) {
				const hitTestResults = frame.getHitTestResultsForTransientInput(this.xrHitTestSource);
				console.log(2, hitTestResults)
				if (hitTestResults.length > 0) {
					const results = hitTestResults[0].results;
					if (results.length > 0) {
						const pose = results[0].getPose(refSpace);
						console.log("pose:", pose)
						return {
							inputSpace: hitTestResults[0].inputSource.targetRaySpace,
							pose
						};
					} else {
						return false
					}
				} else {
					return false;
				}
			} else {
				const hitTestResults = frame.getHitTestResults(this.xrHitTestSource);
				if (hitTestResults.length > 0) {
					const pose = hitTestResults[0].getPose(refSpace);
					return {
						pose,
						inputSpace: this.space
					};
				} else {
					return false;
				}
			}
		}
	}
}

let sceneEl;
let session;

let render;

document.addEventListener("ar-hit-test-start", function (startEvent) {
    console.log("start")
    sceneEl = document.querySelector('a-scene');
    session = sceneEl.renderer.xr.getSession();
    let renderer = sceneEl.renderer;
    console.log(sceneEl.is("ar-mode"));

    const viewerSpace = session.requestReferenceSpace('viewer');
    const viewerHitTest = new HitTest(renderer, {
        space: viewerSpace
    });
    hitTest = viewerHitTest;
    console.log(hitTest)
    console.log("session:", session)
    console.log("render:", renderer)
    // hitTest.doHit(sceneEl.frame)

});

document.addEventListener("ar-hit-test-select", function (customEvent) {
    console.log("select")
    // const sceneEl = document.querySelector('a-scene');
    // // sceneEl
    // var myEntity = document.querySelector('#myobject');   
    // // myEntity.setAttribute('position', '1 2 3'); 
    // console.log(sceneEl)
    // console.log(myEntity)

    // console.log(customEvent)

    // const frame = sceneEl.frame;
	// if (!frame) return;
    // console.log("frame:",frame)
    // const inputSource = customEvent.detail.inputSource;

    // const space = inputSource.targetRaySpace;
    // console.log("space:", space)
    // const pose = frame.getPose(space, customEvent.srcElement.renderer.xr.getReferenceSpace());

	// Default to selecting through the face

	// These are transient inputs so need to be handled seperately
    const profileToSupport = "generic-touchscreen";
    const transientHitTest = new HitTest(renderer, {
        profile: profileToSupport,
    });
});