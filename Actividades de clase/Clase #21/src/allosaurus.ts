export class allosaurus {
    tamaño: number;
    color: string;
    especie: string;
    alimentación: string;
    nombre: string;


    constructor(tamaño: number, color: string, especie: string, alimentación: string, nombre: string) {
        this.tamaño = tamaño;
        this.color = color;
        this.especie = especie;
        this.alimentación = alimentación;
        this.nombre = nombre;
    }

    public cazar(presa: string): void {
console.log(`El dinosaurio de la especie ${this.especie}, tiene este tamaño: ${this.tamaño} metros, 
es de color ${this.color}, de alimentacion ${this.alimentación},
su nombre es ${this.nombre} y está cazando a un ${presa}.`);
    }
    
    
}
