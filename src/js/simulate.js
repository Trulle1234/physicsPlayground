import Matter from "matter-js";
import { addPoly, addCircle, addRect } from "./add.js"
import * as settings from "./settings.js";
import { initMenu } from "./menu.js";
Object.assign(globalThis, settings);

const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

export const engine = Engine.create();

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
    stiffness: 0.02,
    damping: 0.4
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
    addRect(x / scale, y / scale, 80, 80, 10, 0.02, 0.5, 0.5, 0.8);
  } else if (id == "img-circle") {
    addCircle(x / scale, y / scale, 80, 10, 0.02, 0.5, 0.5, 0.8);
  } else if (id == "img-triangle") {
    addPoly(x / scale, y / scale, 3, 80, 10, 0.02, 0.5, 0.5, 0.8);
  }
}