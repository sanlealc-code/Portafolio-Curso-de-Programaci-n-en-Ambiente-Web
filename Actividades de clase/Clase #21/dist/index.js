"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allosaurus = void 0;
console.log("Hola mundo!");
console.log("Hola mundoDos!");
let nombre = "Hola";
let numeroDos = "Tigran";
console.log(`Nola ${numeroDos}`);
function saludar(nombre) {
    console.log(`Hola ${nombre}`);
}
saludar("Garry");
function restar(a, b, c) {
    if (c !== undefined) {
        return a - b - c;
    }
    return a - b;
}
restar(35, 10, 5);
console.log(restar(35, 10, 5));
const allosaurus_1 = require("./allosaurus");
const estudiante_1 = require("./estudiante");
let estudiante1 = new estudiante_1.estudiante("Juan", 20, "Perez", 12345678);
estudiante1.matricular();
var allosaurus_2 = require("./allosaurus");
Object.defineProperty(exports, "allosaurus", { enumerable: true, get: function () { return allosaurus_2.allosaurus; } });
let allosaurus1 = new allosaurus_1.allosaurus(8, "Verde", "Allosaurus", "Carnívora", "Gran Al");
allosaurus1.cazar("Stegosaurus");
//# sourceMappingURL=index.js.map