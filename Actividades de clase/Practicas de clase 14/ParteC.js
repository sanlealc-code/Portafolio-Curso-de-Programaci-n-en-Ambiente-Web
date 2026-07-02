const preferenciasCliente = {
  ana: { direccion: { edificio: "Aulas 3" } },
  luis: {}
};

// Accede de forma segura a datos que pueden no existir
const edificioAna = preferenciasCliente.ana?.direccion?.edificio;
const edificioLuis = preferenciasCliente.luis?.direccion?.edificio;

console.log(`Edificio de Ana: ${edificioAna}`);
console.log(`Edificio de Luis: ${edificioLuis ?? "No registrado"}`);

/*
export function calcularTotalDia() {

  return pedidos.reduce((total, pedido) => total + (pedido.precio ?? 0), 0);
}
*/