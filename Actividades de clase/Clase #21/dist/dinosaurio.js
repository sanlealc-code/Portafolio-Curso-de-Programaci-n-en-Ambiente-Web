"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dinosaurio = void 0;
class dinosaurio {
    tamaño;
    color;
    especie;
    sonido;
    constructor(tamaño, color, especie, sonido) {
        this.tamaño = tamaño;
        this.color = color;
        this.especie = especie;
        this.sonido = sonido;
    }
    comer(alimento) {
        console.log(`El dinosaurio de especie ${this.especie} está comiendo ${alimento}.`);
    }
    emitirSonido() {
        console.log(`El dinosaurio de especie ${this.especie} emite un ${this.sonido}.`);
    }
}
exports.dinosaurio = dinosaurio;
//# sourceMappingURL=dinosaurio.js.map