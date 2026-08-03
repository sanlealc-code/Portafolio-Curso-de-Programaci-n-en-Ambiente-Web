console.log("Hola mundo!");
console.log("Hola mundoDos!");

let nombre: string = "Hola";
let numeroDos: string = "Tigran";

console.log(`Nola ${numeroDos}`);

function saludar(nombre: string): void {
    console.log(`Hola ${nombre}`);
}

saludar("Garry");

function restar(a: number, b: number, c?: number): number {
    if (c !== undefined) {
        return a - b - c;
    }   
    return a - b;
}

restar(35, 10, 5);
console.log(restar(35, 10, 5));

import { allosaurus } from "./allosaurus";
import { estudiante } from "./estudiante";
let estudiante1 = new estudiante("Juan", 20, "Perez", 12345678);
estudiante1.matricular();


export { allosaurus } from "./allosaurus";
let allosaurus1 = new allosaurus(8, "Verde", "Allosaurus", "Carnívora", "Gran Al");
allosaurus1.cazar("Stegosaurus");

