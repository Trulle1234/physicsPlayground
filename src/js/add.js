import { Bodies} from "matter-js";
import { objects } from "./simulate.js";

export function addRect(x, y, width, height, density, sides, diameter) {
    var object = Bodies.rectangle(x, y, width, height, {  density: density});
    objects.push(object);
}
export function addPoly(x, y, sides, diameter, density) {
    var object = Bodies.polygon(x, y, sides, diameter / 2, {  density: density});
    objects.push(object);
} 
export function addCircle(x, y, diameter, density) {
    var object = Bodies.circle(x, y, diameter / 2, {  density: density});
    objects.push(object);
}