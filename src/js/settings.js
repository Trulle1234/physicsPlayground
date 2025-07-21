const mql = window.matchMedia("(orientation: portrait)");

export var WIDTH = null;
export var HEIGHT = null;

if (mql.matches) {
    WIDTH = 1080;
    HEIGHT = 1920;
} else {
    WIDTH = 1920;
    HEIGHT = 1080;
}
export const WALL_WIDTH = 100;