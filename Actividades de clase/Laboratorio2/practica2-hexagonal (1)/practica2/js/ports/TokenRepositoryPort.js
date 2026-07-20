/* ############################################################
   PUERTO — TokenRepositoryPort
   Contrato que debe cumplir cualquier adaptador que persista
   el Access Token (Cookie, localStorage, memoria, etc.).
   La capa de aplicación depende de ESTA abstracción, nunca
   de una implementación concreta (Inversión de Dependencias).
   ############################################################ */

export class TokenRepositoryPort {
  /**
   * Persiste un Token con una duración de vida determinada.
   * @param {import("../domain/Token.js").Token} token
   * @param {number} duracionMs
   */
  guardar(token, duracionMs) {
    throw new Error("TokenRepositoryPort.guardar no implementado");
  }

  /** @returns {import("../domain/Token.js").Token} */
  obtener() {
    throw new Error("TokenRepositoryPort.obtener no implementado");
  }
}
