//Actividad Uno
//A. FizzBuzz modificado
//Iterar del 1 al 30, imprimir "Fizz" si el número es divisible entre 3, 
//  "Buzz" si es divisible entre 5, y "FizzBuzz" si es divisible entre ambos.
for (let i = 1; i <= 30; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

//Dado el array [12, 5, 88, 3, 42, 7, 100], encuentra el PRIMER número mayor a 50 e imprime su posición. 
// Al encontrarlo, detén el ciclo.
const numbers = [12, 5, 88, 3, 42, 7, 100];
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 50) {
        console.log(`El primer número mayor a 50 es ${numbers[i]} y su posición es ${i}.`);
        break;
    }
}

//Suma sin negativo. Dado [10, -3, 7, -1, 5, 8, -2], suma todos los números. 
// Si el número es negativo, omítelo (usa continue). Imprime la suma final.
const nums = [10, -3, 7, -1, 5, 8, -2];
let sum = 0;
for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0) {
        continue;
    }
    sum += nums[i];
}
console.log(`La suma final es: ${sum}`);

//Usa do...while. Simula un PIN con la variable correctoPIN = "1234". 
// Pide el PIN en un prompt. Si es incorrecto, muestra "Incorrecto, intente de nuevo". Máximo 3 intentos.
const PIN = "1234";
let intentos = 0, ingresado;
do {
  ingresado = prompt("Ingresa tu PIN:");
  intentos++;
  if (ingresado !== PIN && intentos < 3)
    alert("Incorrecto. Intente de nuevo.");
} while (ingresado !== PIN && intentos < 3);
if (ingresado === PIN) alert("Acceso ✓");
else alert("Bloqueado");





