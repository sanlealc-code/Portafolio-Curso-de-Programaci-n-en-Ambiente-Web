import {
  crearPedido,
  calcularTotalDia,
  aplicarDescuento,
  obtenerPedidos
} from "./pedidos.js";

import { mostrarPedidoCreado, mostrarTotalDia } from "./ui.js";

// Punto de entrada que coordina el flujo completo del programa
const pedidoAna = crearPedido({
  cliente: "Ana",
  producto: "Casado",
  precio: 2500,
  notas: "Sin cebolla"
});

mostrarPedidoCreado(pedidoAna);

const pedidoLuis = crearPedido({
  cliente: "Luis",
  producto: "Cafe con pan",
  precio: 1200,
  notas: undefined
});

mostrarPedidoCreado(pedidoLuis);

const pedidoConDescuento = aplicarDescuento(pedidoAna, 10);

const totalDia = calcularTotalDia();
mostrarTotalDia(totalDia);