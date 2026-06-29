import {Animal} from ("./Animal")
class Perro extends Animal {
    constructor (nombre, raza) {
        this.nombre = nombre;
        this.raza = raza;
        this.dueños = [];
    }
}

const CanisLupusFamiliaris = new Perro ("Poppy", "Saguate");
constlog(Perro.nombre, Perro.raza);
