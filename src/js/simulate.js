import Matter from "matter-js";
import { addPoly, addCircle, addRect } from "./add.js"
import * as settings from "./settings.js";
Object.assign(globalThis, settings);

const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

const engine = Engine.create();

const render = Render.create({
    element: document.body,
    engine: engine
});

Matter.Render.setSize(render, WIDTH, HEIGHT);

const ground = Bodies.rectangle(WIDTH / 2, HEIGHT + (WALL_WIDTH / 2), WIDTH, WALL_WIDTH, { isStatic: true });
const wallLeft = Bodies.rectangle(0 - (WALL_WIDTH / 2), HEIGHT, WALL_WIDTH, HEIGHT * 2, { isStatic: true });
const wallRight = Bodies.rectangle(WIDTH + (WALL_WIDTH / 2), HEIGHT, WALL_WIDTH, HEIGHT * 2, { isStatic: true });
const ceiling = Bodies.rectangle(WIDTH / 2, 0 - (WALL_WIDTH / 2), WIDTH, WALL_WIDTH, { isStatic: true, isSensor: true });

export let objects = [ground, wallLeft, wallRight, ceiling];

const SIZE = 80;
const SIDES = 32;
const DENSITY = 0.2;
let x = SIZE + SIZE / 10;
let y = 0;
let sizeOffset = 0;
let densityOffset = 0;
const SIZE_OFFSET_STRENGTH = 0.1;
const DENSITY_OFFSET_STRENGTH = 8;
const AMOUNT = 100;
let placeBox = false;

for (let i = 0; i < AMOUNT; i++) {
    if (placeBox) {
        addRect( x, y, SIZE + sizeOffset, SIZE + sizeOffset, DENSITY + densityOffset)
    }
    else {
        addCircle(x, y, SIZE  + sizeOffset / 2, DENSITY + densityOffset)
    }
    
    sizeOffset = (Math.random() * (SIZE * SIZE_OFFSET_STRENGTH));
    densityOffset = (Math.random() * (DENSITY * DENSITY_OFFSET_STRENGTH));

    placeBox = !placeBox

    x += SIZE + SIZE / 10
    y -= SIZE / 5
    
    if (x > WIDTH - SIZE + SIZE / 10) {
        x = SIZE + SIZE / 10
        y += SIZE + SIZE / 10
    }
};

Composite.add(engine.world, objects);

Render.run(render);


var runner = Runner.create();

Runner.run(runner, engine);