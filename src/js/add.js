import { Bodies, Composite} from "matter-js";
import { objects, engine } from "./simulate.js";

export function addRect(x, y, width, height, density, frictionAir, friction, frictionStatic, restitution) {
    var object = Bodies.rectangle(x, y, width, height, {
          density: density,
          frictionAir: frictionAir,
          friction: friction,
          frictionStatic: frictionStatic,
          restitution: restitution
        });
    objects.push(object);
    Composite.add(engine.world, object);
}
export function addPoly(x, y, sides, diameter, density, frictionAir, friction, frictionStatic, restitution) {
    var object = Bodies.polygon(x, y, sides, diameter / 2, {          
          density: density,
          frictionAir: frictionAir,
          friction: friction,
          frictionStatic: frictionStatic,
          restitution: restitution
        });
    objects.push(object);
    Composite.add(engine.world, object);
} 
export function addCircle(x, y, diameter, density, frictionAir, friction, frictionStatic, restitution) {
    var object = Bodies.circle(x, y, diameter / 2, {
          density: density,
          frictionAir: frictionAir,
          friction: friction,
          frictionStatic: frictionStatic,
          restitution: restitution
        });
    objects.push(object);
    Composite.add(engine.world, object);
}