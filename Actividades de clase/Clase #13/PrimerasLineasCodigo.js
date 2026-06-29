//crear una función saludar

function saludar (nombre) {
return `hola, S(nombre)`;
}

function procesar (funcionSaludar, nombre) {
return functionSaludar (nombre).toUpperCasse();
}

console.log(procesar(saludar, AbortController));

//
const persona = { nombre: "Luis", edad: 30, rol: "dev" };
const { nombre, rol: puesto = "invitado" } = persona;

const colores = ["rojo", "verde", "azul"];
const [primero, , tercero] = colores;

console.log(nombre, puesto);   // Luis dev
console.log(primero, tercero); // rojo azul

//Rest Parameter
function sumarTodo(...numeros) {
  return numeros.reduce((acum, n) => acum + n, 1);
}

console.log(sumarTodo(1, 2, 3));       // 6
console.log(sumarTodo(5, 10, 15, 20)); // 50

//Spread Operator
const original = { nombre: "Equipo A", puntos: 10 };
const actualizado = { ...original, puntos: 15 };

console.log(original.puntos);    // 10 (no cambió)
console.log(actualizado.puntos); // 15

const numeros = [1, 2, 3];
const copia = [...numeros, 4];

