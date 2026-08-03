    //Clase
    class estudiante {
    private nombre: string;
    private edad: number;
    private primer_apellido: string;
    private cedula: number;

    //Constructor y atributos
    constructor(nombre: string, edad: number, primer_apellido: string, cedula: number) {
        this.nombre = nombre;
        this.edad = edad;
        this.primer_apellido = primer_apellido;
        this.cedula = cedula;
    }

    //Metodos
    public matricular(): void {
        console.log(`la cedula ${this.cedula} nombre: ${this.nombre} 
        primer apellido: ${this.primer_apellido} edad: ${this.edad} se ha matriculado`);
    }



    public getNombre(): string {
        return this.nombre;
    }

    public getEdad(): number {
        return this.edad;
    }

    public getPrimerApellido(): string {
        return this.primer_apellido;
    }

    public getCedula(): number {
        return this.cedula;
    }
}

export { estudiante };