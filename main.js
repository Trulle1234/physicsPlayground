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

const width = 1920;
const height = 1080;
const wallWidth = 15;

Matter.Render.setSize(render, width, height);

const ground = Bodies.rectangle(width / 2, height + (wallWidth / 2), width, wallWidth, { isStatic: true });
const wallLeft = Bodies.rectangle(0 - (wallWidth / 2), height, wallWidth, height * 2, { isStatic: true });
const wallRight = Bodies.rectangle(width + (wallWidth / 2), height, wallWidth, height * 2, { isStatic: true });
const ceiling = Bodies.rectangle(width / 2, 0 - (wallWidth / 2), width, wallWidth, { isStatic: true, isSensor: true });

let objects = [ground, wallLeft, wallRight, ceiling];

const size = 80;
const sides = 32;
let x = size + size / 10;
let y = 0;
let sizeOffset = 0;
const sizeOffsetStrength =0.2;
const Amount = 100;
let placeBox = false;

for (let i = 0; i < Amount; i++) {
    if (placeBox) {
    var box = Bodies.rectangle(x, y, size + sizeOffset, size + sizeOffset);
    }
    else {
    var box = Bodies.polygon(x, y, sides, (size + sizeOffset)/ 2);
    }
    
    sizeOffset = (Math.random() * (size * sizeOffsetStrength));

    placeBox = !placeBox

    objects[i + 4] = box
    x += size + size / 10
    y -= size / 5
    
    if (x > width - size + size / 10) {
        x = size + size / 10
        y += size + size / 10
    }
};

Composite.add(engine.world, objects);

Render.run(render);


var runner = Runner.create();

Runner.run(runner, engine);