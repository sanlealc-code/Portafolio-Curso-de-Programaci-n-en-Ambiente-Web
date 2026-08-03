declare class estudiante {
    private nombre;
    private edad;
    private primer_apellido;
    private cedula;
    constructor(nombre: string, edad: number, primer_apellido: string, cedula: number);
    matricular(): void;
    getNombre(): string;
    getEdad(): number;
    getPrimerApellido(): string;
    getCedula(): number;
}
export { estudiante };
//# sourceMappingURL=estudiante.d.ts.map