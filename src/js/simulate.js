import Matter from "matter-js";
import { addPoly, addCircle, addRect } from "./add.js"
import * as settings from "./settings.js";
import { initMenu, density, friction, frictionAir, height, restitution, width } from "./menu.js";
import "./tilt.js"

Object.assign(globalThis, settings);

const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

export const engine = Engine.create();
window.engine = engine; 

export const render = Render.create({
    element: document.body,
    engine: engine
});

Matter.Render.setSize(render, WIDTH, HEIGHT);

const ground = Bodies.rectangle(WIDTH / 2, HEIGHT + (WALL_WIDTH / 2), WIDTH, WALL_WIDTH, { isStatic: true });
const wallLeft = Bodies.rectangle(0 - (WALL_WIDTH / 2), HEIGHT, WALL_WIDTH, HEIGHT * 2, { isStatic: true });
const wallRight = Bodies.rectangle(WIDTH + (WALL_WIDTH / 2), HEIGHT, WALL_WIDTH, HEIGHT * 2, { isStatic: true });
const ceiling = Bodies.rectangle(WIDTH / 2, 0 - (WALL_WIDTH / 2), WIDTH, WALL_WIDTH, { isStatic: true});

export let objects = [ground, wallLeft, wallRight, ceiling];

var mouse = Mouse.create(render.canvas)
var mConstraint = MouseConstraint.create(engine, {
    mouse: mouse, 
    constraint: {  
    stiffness: 0.06,
    damping: 0.9,
    render: {visible: false}
  }});
Composite.add(engine.world, mConstraint);

Composite.add(engine.world, objects);

initMenu(render.canvas);

Render.run(render);

var runner = Runner.create();

Runner.run(runner, engine);

export function addFromMenu(x, y, id) {
  let scale = render.canvas.clientWidth / settings.WIDTH
  if (id == "img-square") {
    addRect(x / scale, y / scale, width.value, height.value, density.value, frictionAir.value, friction.value, 0.5, restitution.value);
  } else if (id == "img-circle") {
    addCircle(x / scale, y / scale, width.value, density.value, frictionAir.value, friction.value, 0.5, restitution.value);
  } else if (id == "img-triangle") {
    addPoly(x / scale, y / scale, 3, width.value, density.value, frictionAir.value, friction.value, 0.5, restitution.value);
  }
}

document.addEventListener("keypress", function(event) {
  if (event.key.toLowerCase() === "c") {
    Matter.World.clear(engine.world, true);

    Matter.Engine.clear(engine);

    Runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

  }
});

const mql = window.matchMedia("(orientation: portrait)");

function rotateCanvasIfPortrait() {
  const canvas = document.querySelector("canvas");
  if (!canvas) return;
  if (mql.matches) {
    canvas.classList.add("portrait-rotate");
  } else {
    canvas.classList.remove("portrait-rotate");
  }
}

if (mql.addEventListener) {
  mql.addEventListener("change", rotateCanvasIfPortrait);
}

window.addEventListener("resize", rotateCanvasIfPortrait);
window.addEventListener("orientationchange", rotateCanvasIfPortrait);

document.addEventListener("DOMContentLoaded", rotateCanvasIfPortrait);