export function initMenu() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    const openIcon = '&#9776;'; // ☰
    const closeIcon = '&times;';   // ×

    // Toggle sidebar and icon
    toggleBtn.addEventListener('click', () => {
        const isActive = sidebar.classList.toggle('active');
        
        if (isActive) {
            toggleBtn.innerHTML = closeIcon;
        } else {
            toggleBtn.innerHTML = openIcon;
        }
    });

    // Close sidebar when clicking outside of it
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
}