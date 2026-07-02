  // Genera el mensaje cuando se crea un pedido
export function mostrarPedidoCreado(pedido) {
  console.log(
    `Pedido creado para ${pedido.cliente}: ${pedido.producto} - ${pedido.precio}`
  );
}

  // Muestra el total acumulado del día
export function mostrarTotalDia(total) {
  console.log(`Total del día: ${total}`);
}
