let pedidos = [];

  // Crea un pedido y lo guarda en la lista interna
export function crearPedido({ cliente, producto, precio, notas }) {
  const pedido = { cliente, producto, precio, notas };
  pedidos.push(pedido);
  return pedido;
}

 // Suma los precios de todos los pedidos registrados
export function calcularTotalDia() {
  return pedidos.reduce((total, pedido) => total + pedido.precio, 0);
}

 // Devuelve un pedido nuevo con el descuento aplicado
export function aplicarDescuento(pedido, porcentaje) {
  return {
    ...pedido,
    precio: pedido.precio - (pedido.precio * porcentaje) / 100
  };
}


  // Permite acceder a la lista completa de pedidos
export function obtenerPedidos() {
  return pedidos;
}