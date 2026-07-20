/* ############################################################
   PUERTO — FavoritosRepositoryPort
   Contrato para la biblioteca de prompts favoritos. Debe
   sobrevivir a cerrar/reabrir el navegador (lo garantiza el
   adaptador concreto, no este contrato).
   ############################################################ */

export class FavoritosRepositoryPort {
  /** @returns {string[]} */
  obtenerTodos() {
    throw new Error("FavoritosRepositoryPort.obtenerTodos no implementado");
  }

  /**
   * Agrega un prompt y devuelve la lista actualizada.
   * @param {string} texto
   * @returns {string[]}
   */
  agregar(texto) {
    throw new Error("FavoritosRepositoryPort.agregar no implementado");
  }
}
