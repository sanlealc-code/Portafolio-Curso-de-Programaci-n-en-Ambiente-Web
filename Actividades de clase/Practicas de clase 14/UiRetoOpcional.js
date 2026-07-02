export default function generarResumenDia(...pedidos) {
  // Construye un resumen legible del día a partir de todos los pedidos
  return `
Resumen del día:
${pedidos.map(
  pedido =>
    `- ${pedido.producto} para ${pedido.cliente}: ${pedido.precio} colones`
).join("\n")}
`;
}