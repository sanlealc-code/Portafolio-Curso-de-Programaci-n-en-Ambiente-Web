export class dinosaurio {
    tamaño: string;
    color: string;
    especie: string;
    sonido: string;
    
    constructor(tamaño: string, color: string, especie: string, sonido: string) {
        this.tamaño = tamaño;
        this.color = color;
        this.especie = especie;
        this.sonido = sonido;
    }

    public comer(alimento: string): void {
        console.log(`El dinosaurio de especie ${this.especie} está comiendo ${alimento}.`);
    }

    public emitirSonido(): void {
        console.log(`El dinosaurio de especie ${this.especie} emite un ${this.sonido}.`);
    }
}
