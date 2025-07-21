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
  let gamma = event.gamma ?? 0;
  let beta  = event.beta  ?? 0;
  
  gamma = Math.max(-90, Math.min(90, gamma));
  beta  = Math.max(-90, Math.min(90, beta));

  engine.world.gravity.x = gamma / 90;
  engine.world.gravity.y = beta  / 90;
}


initRotationGravity();
