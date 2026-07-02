import {
  crearPedido,
  calcularTotalDia,
  aplicarDescuento
} from "./pedidos.js";

import { mostrarPedidoCreado, mostrarTotalDia } from "./ui.js";

// Coordina la creación de pedidos usando configuración y extras variables
const pedidoAna = crearPedido(
  {
    cliente: "Ana",
    producto: "Casado",
    precio: 2500,
    notas: "Sin cebolla"
  },
  "aguacate",
  "tortilla extra"
);

mostrarPedidoCreado(pedidoAna);

const pedidoLuis = crearPedido(
  {
    cliente: "Luis",
    producto: "Cafe con pan",
    precio: 1200,
    notas: undefined
  }
);

mostrarPedidoCreado(pedidoLuis);

const pedidoConDescuento = aplicarDescuento(pedidoAna, 10);

const totalDia = calcularTotalDia();
mostrarTotalDia(totalDia);