let canvas       = null;
let previewImg   = null;
let dragging     = false;
let currentSrc   = null;

// Initialize menu/sidebar and drag logic
export function initMenu(matterCanvas) {
  canvas = matterCanvas;

  // Sidebar toggle
  const sidebar   = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggle-btn');
  const openIcon  = '&#9776;'; // ☰
  const closeIcon = '&times;'; // ×

  toggleBtn.addEventListener('click', () => {
    const isActive = sidebar.classList.toggle('active');
    toggleBtn.innerHTML = isActive ? closeIcon : openIcon;
  });

  // Click outside sidebar closes it
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

  // Only start drag on the icons
  document.querySelectorAll('.dragable').forEach(icon => {
    icon.addEventListener('pointerdown', startDrag);
  });

  // Listen globally for moves & up to manage the preview
  document.addEventListener('pointermove', onDrag);
  document.addEventListener('pointerup',   endDrag);
}

function startDrag(e) {
  e.preventDefault();
  dragging   = true;
  currentSrc = e.currentTarget.src;
  // capture the pointer on the icon so we get its up event
  e.currentTarget.setPointerCapture(e.pointerId);
}

function onDrag(e) {
  if (!dragging) return;

  // on first move, create the preview image
  if (!previewImg) {
    previewImg = document.createElement('img');
    previewImg.src           = currentSrc;
    previewImg.classList.add('drag-preview');
    previewImg.style.position  = 'fixed';
    previewImg.style.pointerEvents = 'none';
    // center the image under cursor:
    previewImg.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(previewImg);
  }

  // update its position
  previewImg.style.left = e.clientX + 'px';
  previewImg.style.top  = e.clientY + 'px';
}

function endDrag(e) {
  if (!dragging) return;
  dragging = false;

  // remove the preview if it exists
  if (previewImg) {
    previewImg.remove();
    previewImg = null;
  }

  // check drop on canvas
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
    alert(`x: ${x}, y: ${y}`);
  }

  // release pointer capture (if still held)
  try {
    e.currentTarget.releasePointerCapture(e.pointerId);
  } catch (err) {
    // harmless if pointerup fired on document
  }
}
