const popup = document.getElementById("popup");
const mql = window.matchMedia("(orientation: portrait)");

if (mql.matches) {
    popup.classList.remove("close-popup");
    popup.style.visibility = "visible";
} else {
    popup.classList.add("close-popup");
    popup.style.visibility = "hidden";
}

export function closePopup() {
    popup.classList.add("close-popup");
    popup.style.visibility = "hidden";
}

window.closePopup = closePopup;