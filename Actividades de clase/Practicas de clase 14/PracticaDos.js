// Parte A — Naturaleza del arreglo

const ventasFeria = [
  {
    stand: "Stand 3", producto: "Empanadas", categoria: "comida",
    monto: 15000, etiquetas: ["salado", "artesanal"]
  },
  {
    stand: "Stand 3", producto: "Refresco natural", categoria: "bebida",
    monto: 6000, etiquetas: ["natural"]
  },
  {
    stand: "Stand 7", producto: "Llavero tallado", categoria: "artesania",
    monto: 3500, etiquetas: ["madera", "artesanal"]
  },
  {
    stand: "Stand 7", producto: "Pulsera tejida", categoria: "artesania",
    monto: 2500, etiquetas: ["tejido"]
  },
  {
    stand: "Stand 12", producto: "Jabon artesanal", categoria: "cuidado",
    monto: 4000, etiquetas: ["natural", "artesanal"]
  },
  {
    stand: "Stand 5", producto: "Cafe de altura", categoria: "bebida",
    monto: 8000, etiquetas: ["organico"]
  },
  {
    stand: "Stand 5", producto: "Postre de cafe", categoria: "comida",
    monto: 3000, etiquetas: ["dulce"]
  }
];
// typeof devuelve "object" porque los arreglos son objetos con índices numéricos
console.log(typeof ventasFeria);

// El length se ajusta al índice más alto más uno
ventasFeria[15] = { stand: "Stand 20", producto: "Sorpresa" };
console.log(ventasFeria.length);
// Se limpia el arreglo para continuar con datos correctos
ventasFeria.length = 7;

// Parte B — Imperativo vs declarativo

const ventasAltas = ventasFeria.filter(venta => venta.monto > 5000);

const nombresProductos = ventasFeria.map(
  venta => venta.producto.toUpperCase()
);

// Parte C — Inmutabilidad vs mutación
function ordenarPorMonto(lista) {
  return [...lista].sort((a, b) => b.monto - a.monto);
}

const ordenadas = ordenarPorMonto(ventasFeria);


// Parte D — map(): transformación 1 a uno
const resumenVentas = ventasFeria.map(
  venta => `${venta.producto.toUpperCase()} (${venta.stand}) — ${venta.monto} colones`
);


// Parte E — filter(): extracción condicional

const ventasArtesania = ventasFeria.filter(
  venta => venta.categoria === "artesania"
);

const nombresArtesania = ventasArtesania.map(
  venta => venta.producto
);


//Parte F — find() y findIndex(): búsqueda de elementos
const primeraVentaAlta = ventasFeria.find(
  venta => venta.monto > 7000
);

const indiceVentaAlta = ventasFeria.findIndex(
  venta => venta.monto > 7000
);

// Parte G — reduce(): de colección a valor

const totalPorCategoria = ventasFeria.reduce((acumulador, venta) => {
  acumulador[venta.categoria] =
    (acumulador[venta.categoria] ?? 0) + venta.monto;
  return acumulador;
}, {});
// El acumulador inicia como objeto porque el resultado esperado es un objeto
const totalGeneral = ventasFeria.reduce(
  (total, venta) => total + venta.monto,
  0
);

//// Parte H — sort(): ordenamiento real

const montos = ventasFeria.map(venta => venta.monto);

montos.sort();

const ventasOrdenadas = [...ventasFeria].sort(
  (a, b) => b.monto - a.monto
);

//// Parte I — flatMap(): aplanar y transformar

const todasLasEtiquetas = ventasFeria.flatMap(
  venta => venta.etiquetas
);

const etiquetasUnicas = new Set(todasLasEtiquetas);
console.log(etiquetasUnicas.size);
// Set elimina duplicados automáticamente




    // Reto opcional — una sola expresión encadenada

const reporteArtesania = ventasFeria
  .filter(venta => venta.categoria === "artesania")
  .map(venta => `${venta.producto} — ${venta.monto} colones`)
  .sort();
// filter selexiona, map transforma y zort ordena sin variables intermedias
