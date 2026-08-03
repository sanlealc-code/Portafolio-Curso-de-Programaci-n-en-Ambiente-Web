"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estudiante = void 0;
//Clase
class estudiante {
    nombre;
    edad;
    primer_apellido;
    cedula;
    //Constructor y atributos
    constructor(nombre, edad, primer_apellido, cedula) {
        this.nombre = nombre;
        this.edad = edad;
        this.primer_apellido = primer_apellido;
        this.cedula = cedula;
    }
    //Metodos
    matricular() {
        console.log(`la cedula ${this.cedula} nombre: ${this.nombre} 
        primer apellido: ${this.primer_apellido} edad: ${this.edad} se ha matriculado`);
    }
    getNombre() {
        return this.nombre;
    }
    getEdad() {
        return this.edad;
    }
    getPrimerApellido() {
        return this.primer_apellido;
    }
    getCedula() {
        return this.cedula;
    }
}
exports.estudiante = estudiante;
//# sourceMappingURL=estudiante.js.map