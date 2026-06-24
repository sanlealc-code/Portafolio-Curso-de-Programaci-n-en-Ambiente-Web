//Actividades de clase 2
//Clasificación de variables

//Número Uno:
//a) ECMAscript
//b) API
//c) ECMAScript
//d) API
//e) ECMAScript

//Ejercicio 2
//generarFactura() está en la pila.
//Dentro de ella, se llamó a calcularTotal(500,3).
//Esa función está ejecutando return calcularIVA(subtotal).
//En ese instante, calcularIVA está en el tope de la pila.
//Orden, seria el Tope → calcularIVA, 
// /Debajo → calcularTotal
//Más abajo → generarFactura
//Base → contexto global.


//Ejercicio 3
//La afirmación es falsa porque asíncrono no significa paralelo dentro del motor de JavaScript.

//Ejercicio 4
function probarScope() {
  if (true) {
    var a = 1;
    let b = 2;
  }
  console.log(a);
  console.log(b);
}
probarScope();

//Ejercicio 5
const inventario = { producto: 'Mouse', stock: 15 };
inventario.stock = 20;
inventario.disponible = true;
inventario = { producto: 'Teclado', stock: 8 };
console.log(inventario);

//Hay error en la linea inventario = { producto: 'Teclado', stock: 8 }; porque el inventario fue declarado como
//constante

//Ejercicio 6
//porque var i y var doble no respetan el for
let resultado;
for (let i = 0; i < 5; i++) {
  const doble = i * 2;
  resultado = doble;
}

//Ejercicio 7
function verificarEdad() {
  console.log('Verificando...');
  console.log(edadMinima);
  let edadMinima = 18;
  return edadMinima;
}
verificarEdad();

//ReferenceError en console.log(edadMinima);
//dadMinima está en 
// la Zona Muerta Temporal (TDZ) desde que entra a la función hasta que se ejecuta la línea del let.


//Ejercicio 8
/*1
Resultado: '105'
Tipo: string
+ con string concatena.

2)
Resultado: 5
Tipo: number
- fuerza conversión numérica.

3) 
Resultado: 3
Tipo: number
true se convierte en 1.

4)
Resultado: 0
Tipo: number
null se convierte en 0.

5)
Resultado: NaN
Tipo: number
undefined no se puede convertir a número válido.

6) 
Resultado: false
Tipo: boolean
Comparación estricta, tipos distintos.

7) 
Resultado: true
Tipo: boolean
Hay coerción: '5' se convierte a número 5.

8)
Resultado: 'string'
Tipo: string
*/


  //Ejercicio 9 – Truthy / Falsy


/*
FALSY:
0
''
NaN

TRUTHY:
'0'
' '
[]
{}
-1

Confunden porque:
'0' parece cero pero no lo es.
' ' sigue siendo string.
Los objetos casi siempre son truthy.
-1 no es cero.
*/


/*  EJERCICIO 10 – typeof null/*
typeof null devuelve 'object' (bug viejo del lenguaje).

Chequeo correcto:
valor === null

Null o undefined juntos:
valor == null
*/



/* Ejeric0 11 */

// a)
'' || null || 0 || 'invitado';

// b)
'admin' && 1 && [] && 'permiso';

// c)
0 || (false && 'nunca llega');

// d)
undefined ?? null ?? 'valor por defecto';


/* Ejercicio 12 */
// Se evalúa de izquierda a derecha, corta si algo es falsy
usuario &&
usuario.activo &&
usuario.permisos.includes('editar') &&
habilitarBoton();


/* Ejercicio 13 */
// 1)
null === undefined;
null == undefined;

// 2)
'' === 0;
'' == 0;

// 3)
[] === false;
[] == false;

// 4)
NaN === NaN;
NaN == NaN;

// Para NaN de verdad
Number.isNaN(NaN);
 

/* Ejercicio 14 */
// a) if / else
function calcularDescuento(monto) {
  let descuento = 0;

  if (monto >= 100000) {
    descuento = 0.20;
  } else if (monto >= 50000) {
    descuento = 0.10;
  } else if (monto >= 20000) {
    descuento = 0.05;
  } else {
    descuento = 0;
  }

  return descuento;
}

// b) ternario
const descuento =
  monto >= 100000 ? 0.20 :
  monto >= 50000 ? 0.10 :
  monto >= 20000 ? 0.05 :
  0;



/* Ejercicio15 */
switch (categoria) {
  case 'electronica':
    console.log('Procesando electrónica');
    break;

  case 'ropa':
    console.log('Procesando ropa');
    break;

  case 'calzado':
  case 'accesorios':
    console.log('Procesando calzado o accesorios');
    break;

  case 'libros':
    console.log('Procesando libros');
    break;

  default:
    console.log('Categoría no válida');
    break;
}
// Sin break → fall-through (error clásico)


/* Ejericio 16 */
for (let i = 1; i <= 50; i++) {
  if (i % 2 === 0) {
    console.log(`${i}: Par`);
  } else {
    console.log(`${i}: Impar`);
  }

  if (i % 10 === 0) {
    console.log('Década completa');
  }
}


/* Ejercicio 17 */
const precios = [1500, 2300, 800, -1, 4200, 950];
let total = 0;

for (let i = 0; i < precios.length; i++) {
  const precio = precios[i];

  if (precio < 0) {
    console.log(`Error de datos en la posición ${i}`);
    break;
  }

  total += precio;
}

console.log(`Total acumulado: ${total}`);


/* Ejercicio 18 */
const claveSegura = 'UTN2026';
const intentos = ['1234', 'hola', 'UTN2026', 'otra'];

let indice = 0;
let accesoConcedido = false;
let claveIngresada;

do {
  claveIngresada = intentos[indice];
  indice++;

  if (claveIngresada === claveSegura) {
    accesoConcedido = true;
    break;
  }
} while (indice < 4);

if (accesoConcedido) {
  console.log('Acceso concedido');
} else {
  console.log('Acceso bloqueado');
}


/* Ejercicio 19 */
const edades = [22, 'veinte', 19, null, 30, 25, undefined, 17];
let suma = 0;
let cantidad = 0;

for (const edad of edades) {
  if (typeof edad !== 'number' || Number.isNaN(edad)) {
    continue;
  }

  suma += edad;
  cantidad++;
}

const promedio = cantidad > 0 ? suma / cantidad : 0;

console.log(`Edades válidas: ${cantidad}`);
console.log(`Promedio: ${promedio}`);


/* Ejercicio 20 */
function generarTablaMultiplicar(numero, limite) {
  if (numero <= 0 || limite <= 0) {
    console.log('Error: ambos parámetros deben ser mayores a 0');
    return;
  }

  let i = 1;

  while (i <= limite) {
    console.log(`${numero}x${i}=${numero * i}`);
    i++;
  }
}