"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allosaurus = void 0;
class allosaurus {
    tamaño;
    color;
    especie;
    alimentación;
    nombre;
    constructor(tamaño, color, especie, alimentación, nombre) {
        this.tamaño = tamaño;
        this.color = color;
        this.especie = especie;
        this.alimentación = alimentación;
        this.nombre = nombre;
    }
    cazar(presa) {
        console.log(`El dinosaurio de la especie ${this.especie}, tiene este tamaño: ${this.tamaño} metros, 
es de color ${this.color}, de alimentacion ${this.alimentación},
su nombre es ${this.nombre} y está cazando a un ${presa}.`);
    }
}
exports.allosaurus = allosaurus;
//# sourceMappingURL=allosaurus.js.map