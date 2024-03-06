document.addEventListener("DOMContentLoaded", function () { const sceneEl = document.querySelector('a-scene'); });

document.addEventListener("ar-hit-test-start", function () {
    console.log("start")
    const sceneEl = document.querySelector('a-scene');

    sceneEl.isAR = true;
});

document.addEventListener("ar-hit-test-select", function (customEvent) {
    console.log("select")
    const sceneEl = document.querySelector('a-scene');
    // sceneEl
    var myEntity = document.querySelector('#myobject');   
    // myEntity.setAttribute('position', '1 2 3'); 
    console.log(sceneEl)
    console.log(myEntity)

    console.log(customEvent)

    const frame = sceneEl.frame;
	if (!frame) return;
    console.log("frame:",frame)
    const inputSource = customEvent.detail.inputSource;

    const space = inputSource.targetRaySpace;
    console.log("space:", space)
    const pose = frame.getPose(space, customEvent.srcElement.renderer.xr.getReferenceSpace());

});