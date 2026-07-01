const numeros = [100, 20, 15, 14, 36];
numeros.sort((a, b) => a - b);
console.log(numeros);

for(let i = 0; i < numeros.length; i++) {
    console.log(numeros[i]);
}

const declarativo = numeros.map((n) => n);
console.log("declarativo: " + declarativo);


//Imperativo
const precios = [100, 250, 80, 400];
const carros = [];
for (let i = 0; i < precios.length; i++) {
  if (precios[i] > 150) carros.push(precios[i]);
}

//Declarativo
const carosDeclarativo = precios.filter((precio) => precio > 150);
console.log("Imperativo: " + carros);
console.log("Declarativo: " + carosDeclarativo);



//Actividad 4
const estudiantes = [
  { nombre: "Ana", carnet: "2024001" },
  { nombre: "Luis", carnet: "2024002" }
];

const carnet = estudiantes.map(
    e => `${e.nombre}: ${e.carnet}`)
    console.log ("Carnets: " + carnet);

const nombres = estudiantes.map(
    e => `${e.nombre}`)
    console.log ("Nombres: " + nombres);


// 
    const estudiantes = [
  { nombre: "Ana", promedio: 85 },
  { nombre: "Luis", promedio: 67 },
  { nombre: "Sara", promedio: 91 }
];


//Da una lista plana a un objeto agrupado por categoría
const gastos = [
  { categoria: "comida", monto: 50 },
  { categoria: "transporte", monto: 20 },
  { categoria: "comida", monto: 30 },
]

const sumarTodo = gastos.reduce((acc, g) => acc + g.monto, 0);
console.log(sumarTodo);

/* const porCategoria = gastos.reduce((acc, g) => {
acc[g.categoria] = (acc[g.categoria] || 0) + g.monto;
return acc;
}, {});
console.log(porCategoria);
*/

//Actividad 5







