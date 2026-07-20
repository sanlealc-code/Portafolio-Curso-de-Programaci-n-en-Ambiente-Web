/* ############################################################
   DOMINIO — Conversacion
   Entidad/agregado: colección ordenada de Mensajes. Encapsula
   las reglas de qué significa "una conversación válida".
   ############################################################ */
import { Mensaje } from "./Mensaje.js";

export class Conversacion {
  /** @param {Mensaje[]} mensajes */
  constructor(mensajes = []) {
    this._mensajes = [...mensajes];
  }

  static vacia() {
    return new Conversacion([]);
  }

  static fromJSON(arr) {
    if (!Array.isArray(arr)) return Conversacion.vacia();
    return new Conversacion(arr.map(Mensaje.fromJSON));
  }

  toJSON() {
    return this._mensajes.map((m) => m.toJSON());
  }

  get mensajes() {
    return [...this._mensajes];
  }

  estaVacia() {
    return this._mensajes.length === 0;
  }

  /** Devuelve una NUEVA Conversacion con el mensaje agregado (inmutable). */
  agregar(mensaje) {
    return new Conversacion([...this._mensajes, mensaje]);
  }
}
