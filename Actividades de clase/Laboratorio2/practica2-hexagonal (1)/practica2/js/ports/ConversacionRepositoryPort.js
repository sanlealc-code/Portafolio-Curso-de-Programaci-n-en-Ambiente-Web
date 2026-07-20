/* ############################################################
   PUERTO — ConversacionRepositoryPort
   Contrato para persistir la conversación actual. Su ciclo de
   vida real (sessionStorage, memoria, etc.) lo decide el
   adaptador, no la aplicación.
   ############################################################ */

export class ConversacionRepositoryPort {
  /** @returns {import("../domain/Conversacion.js").Conversacion} */
  obtener() {
    throw new Error("ConversacionRepositoryPort.obtener no implementado");
  }

  /** @param {import("../domain/Conversacion.js").Conversacion} conversacion */
  guardar(conversacion) {
    throw new Error("ConversacionRepositoryPort.guardar no implementado");
  }

  limpiar() {
    throw new Error("ConversacionRepositoryPort.limpiar no implementado");
  }
}
