import { addFromMenu } from "./simulate";
import { WIDTH, HEIGHT } from "./settings";

let canvas       = null;
let previewImg   = null;
let dragging     = false;
let currentSrc   = null;
let currentId    = null;

export const amount = {
  value: 1,
  defaultValue: 1
}
export const width = {
  value: 80,
  defaultValue: 80
}
export const height = {
  value: 80,
  defaultValue: 80
}
export const density = {
  value: 10,
  defaultValue: 10
}
export const frictionAir = {
  value: 0.02,
  defaultValue: 0.02
}
export const friction = {
  value: 0.5,
  defaultValue: 0.5
}
export const restitution = {
  value: 0.8,
  defaultValue: 0.8
}


export function initMenu(matterCanvas) {
  canvas = matterCanvas;

  const sidebar    = document.getElementById('sidebar');
  const toggleBtn  = document.getElementById('toggle-btn');


  const sliderAmount = document.getElementById('slider-amount');
  const outputAmount = document.getElementById('output-amount');
  const resetAmount = document.getElementById('reset-amount');

  const sliderWidth = document.getElementById('slider-width');
  const outputWidth = document.getElementById('output-width');
  const resetWidth = document.getElementById('reset-width');

  const sliderHeight = document.getElementById('slider-height');
  const outputHeight = document.getElementById('output-height');
  const resetHeight = document.getElementById('reset-height');

  const sliderDensity = document.getElementById('slider-density');
  const outputDensity = document.getElementById('output-density');
  const resetDensity = document.getElementById('reset-density');

  const sliderFrictionAir = document.getElementById('slider-friction-air');
  const outputFrictionAir = document.getElementById('output-friction-air');
  const resetFrictionAir = document.getElementById('reset-friction-air')

  const sliderFriction = document.getElementById('slider-friction');
  const outputFriction = document.getElementById('output-friction');
  const resetFriction = document.getElementById('reset-friction')

  const sliderRestitution = document.getElementById('slider-restitution');
  const outputRestitution = document.getElementById('output-restitution');
  const resetRestitution = document.getElementById('reset-restitution')


  const openIcon  = '&#8862;';
  const closeIcon = '&#65336;';

  toggleBtn.addEventListener('click', () => {
    const isActive = sidebar.classList.toggle('active');
    toggleBtn.innerHTML = isActive ? closeIcon : openIcon;
  });

  document.addEventListener('click', (e) => {
    if (
      sidebar.classList.contains('active') &&
      !sidebar.contains(e.target) &&
      e.target !== toggleBtn
    ) {
      sidebar.classList.remove('active');
      toggleBtn.innerHTML = openIcon;
    }
  });


  sliderAmount.addEventListener('input', function(event) {
    outputAmount.innerHTML = "Amount: " + event.target.value;
    amount.value = event.target.value
  });

  sliderWidth.addEventListener('input', function(event) {
    outputWidth.innerHTML = "Width/Diameter: " + event.target.value;
    width.value = event.target.value
  });

  sliderHeight.addEventListener('input', function(event) {
    outputHeight.innerHTML = "Height: " + event.target.value;
    height.value = event.target.value
  });

  sliderDensity.addEventListener('input', function(event) {
    outputDensity.innerHTML = "Density: " + event.target.value;
    density.value = event.target.value
  });

  sliderFrictionAir.addEventListener('input', function(event) {
    outputFrictionAir.innerHTML = "Air Resistance: " + event.target.value;
    frictionAir.value = event.target.value * 0.01
  });

  sliderFriction.addEventListener('input', function(event) {
    outputFriction.innerHTML = "Friction: " + event.target.value;
    friction.value = event.target.value * 0.1
  });

  sliderRestitution.addEventListener('input', function(event) {
    outputRestitution.innerHTML = "Bounciness: " + event.target.value;
    restitution.value = event.target.value * 0.01
  });


  resetAmount.addEventListener("click", () => {
    sliderAmount.value = amount.defaultValue;
    amount.value = amount.defaultValue
    outputAmount.innerHTML = "Amount: " + amount.defaultValue;
  });

  resetWidth.addEventListener("click", () => {
    sliderWidth.value = width.defaultValue;
    width.value = width.defaultValue
  outputWidth.innerHTML = "Width/Diameter: " + width.defaultValue;
  });

  resetHeight.addEventListener("click", () => {
    sliderHeight.value = height.defaultValue;
    height.value = height.defaultValue
    outputHeight.innerHTML = "Height: " + height.defaultValue;
  });
  
  resetDensity.addEventListener("click", () => {
    sliderDensity.value = density.defaultValue;
    density.value = density.defaultValue
    outputDensity.innerHTML = "Density: " + density.defaultValue;
  });

  resetFrictionAir.addEventListener("click", () => {
    sliderFrictionAir.value = frictionAir.defaultValue;
    frictionAir.value = frictionAir.defaultValue
    outputFrictionAir.innerHTML = "Air Resistance: " + frictionAir.defaultValue;
  });

  resetFriction.addEventListener("click", () => {
    sliderFriction.value = friction.defaultValue;
    friction.value = friction.defaultValue
    outputFriction.innerHTML = "Friction: " + friction.defaultValue;
  });

  resetRestitution.addEventListener("click", () => {
    sliderRestitution.value = restitution.defaultValue;
    restitution.value = restitution.defaultValue
    outputRestitution.innerHTML = "Bounciness: " + restitution.defaultValue;
  });


  document.querySelectorAll('.dragable').forEach(icon => {
    icon.addEventListener('pointerdown', startDrag);
  });

  document.addEventListener('pointermove', onDrag);
  document.addEventListener('pointerup',   endDrag);
}

function startDrag(e) {
  e.preventDefault();
  dragging   = true;
  currentSrc = e.currentTarget.src;
  currentId = e.currentTarget.id;
  e.currentTarget.setPointerCapture(e.pointerId);
}

function onDrag(e) {
  if (!dragging) return;

  if (!previewImg) {
    previewImg = document.createElement('img');
    previewImg.src           = currentSrc;
    previewImg.classList.add('drag-preview');
    previewImg.style.position  = 'fixed';
    previewImg.style.pointerEvents = 'none';
    previewImg.style.transform = 'translate(-50%, -50%)';
    previewImg.style.width = (canvas.clientWidth / WIDTH) * 135 + "px";
    previewImg.style.height = (canvas.clientHeight / HEIGHT) * 135 + "px";
    document.body.appendChild(previewImg);
  }

  previewImg.style.left = e.clientX + 'px';
  previewImg.style.top  = e.clientY + 'px';
}

function endDrag(e) {
  if (!dragging) return;
  dragging = false;

  if (previewImg) {
    previewImg.remove();
    previewImg = null;
  }

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
    for (let i = 0; i < amount.value; i++) {
      addFromMenu(x, y, currentId);
    }
  }

  try {
    e.currentTarget.releasePointerCapture(e.pointerId);
  } catch (err) {
  }
}
