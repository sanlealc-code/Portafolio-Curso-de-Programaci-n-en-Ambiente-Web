
interface Caja<T> {
    contenido: T;
    abrir(): T;
}
function intercambiar<T>(Id : Caja<T>, nuevoContenido: T): T {
    const contenidoAnterior = Id.contenido;
    Id.contenido = nuevoContenido;
    return contenidoAnterior;
}