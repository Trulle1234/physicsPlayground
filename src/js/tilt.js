function initRotationGravity() {
  if (
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  ) {
    DeviceOrientationEvent.requestPermission()
      .then(res => {
        if (res === 'granted') {
          window.addEventListener('deviceorientation', handleRotation);
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener('deviceorientation', handleRotation);
  }
}

function handleRotation(event) {
    console.log("α, β, γ =", event.alpha, event.beta, event.gamma);
    const alphaDeg = event.alpha ?? 0;
    const rad = (alphaDeg + 90) * (Math.PI / 180);
    engine.world.gravity.x = Math.cos(rad);
    engine.world.gravity.y = Math.sin(rad);
}

initRotationGravity();
