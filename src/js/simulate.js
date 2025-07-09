import Matter from "matter-js";
import { addPoly, addCircle, addRect } from "./add.js"
import * as settings from "./settings.js";
Object.assign(globalThis, settings);

const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

export const engine = Engine.create();

const render = Render.create({
    element: document.body,
    engine: engine
});

Matter.Render.setSize(render, WIDTH, HEIGHT);

const ground = Bodies.rectangle(WIDTH / 2, HEIGHT + (WALL_WIDTH / 2), WIDTH, WALL_WIDTH, { isStatic: true });
const wallLeft = Bodies.rectangle(0 - (WALL_WIDTH / 2), HEIGHT, WALL_WIDTH, HEIGHT * 2, { isStatic: true });
const wallRight = Bodies.rectangle(WIDTH + (WALL_WIDTH / 2), HEIGHT, WALL_WIDTH, HEIGHT * 2, { isStatic: true });
const ceiling = Bodies.rectangle(WIDTH / 2, 0 - (WALL_WIDTH / 2), WIDTH, WALL_WIDTH, { isStatic: true});

export let objects = [ground, wallLeft, wallRight, ceiling];

document.addEventListener("keydown", function(e) {
    if (e.key == " ") {
        addRect(settings.WIDTH * Math.random(), 40, 80, 80, 10, 0.02, 0.5, 0.5, 0.8)
    }
});

var mouse = Mouse.create(render.canvas)
var mConstraint = MouseConstraint.create(engine, {
    mouse: mouse, 
    constraint: {  
    stiffness: 0.02,
    damping: 0.4
  }});
Composite.add(engine.world, mConstraint);

Composite.add(engine.world, objects);

Render.run(render);

var runner = Runner.create();

Runner.run(runner, engine);