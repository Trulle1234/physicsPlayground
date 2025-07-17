import { addFromMenu } from "./simulate";
import { WIDTH, HEIGHT } from "./settings";

let canvas       = null;
let previewImg   = null;
let dragging     = false;
let currentSrc   = null;
let currentId    = null;

export function initMenu(matterCanvas) {
  canvas = matterCanvas;

  const sidebar    = document.getElementById('sidebar');
  const toggleBtn  = document.getElementById('toggle-btn');
  const sliderWidth = document.getElementById('slider-width');
  const outputWidth = document.getElementById('output-width');
  const openIcon  = '&#9776;'; // ☰
  const closeIcon = '&times;'; // ×

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

  sliderWidth.addEventListener('input', function(event) {
    outputWidth.innerHTML = "Width: " + event.target.value;
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
    addFromMenu(x, y, currentId);
  }

  try {
    e.currentTarget.releasePointerCapture(e.pointerId);
  } catch (err) {
  }
}
