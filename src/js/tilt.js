import { engine } from "./simulate";

const mql = window.matchMedia("(orientation: portrait)");

export function initRotationGravity() {
  if (mql.matches) {
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
  } else {
    handleRotation(null)
  }
}

function handleRotation(event) {
  if (event == null) {
    engine.world.gravity.y = 1;
  } else {
    let gamma = event.gamma ?? 0;
    let beta  = event.beta  ?? 0;
    
    gamma = Math.max(-90, Math.min(90, gamma));
    beta  = Math.max(-90, Math.min(90, beta));

    engine.world.gravity.x = gamma / 90;
    engine.world.gravity.y = beta  / 90;
  }
}

