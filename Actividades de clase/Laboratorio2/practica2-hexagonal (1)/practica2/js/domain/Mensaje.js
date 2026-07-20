/* ############################################################
   DOMINIO — Mensaje
   Value object: un turno de la conversación (user o ia).
   ############################################################ */

const ROLES_VALIDOS = ["user", "ia"];

export class Mensaje {
  /**
   * @param {"user"|"ia"} rol
   * @param {string} contenido
   */
  constructor(rol, contenido) {
    if (!ROLES_VALIDOS.includes(rol)) {
      throw new Error(`Rol de mensaje inválido: ${rol}`);
    }
    if (typeof contenido !== "string" || contenido.trim() === "") {
      throw new Error("El contenido del mensaje no puede estar vacío");
    }
    this.rol = rol;
    this.contenido = contenido;
  }

  toJSON() {
    return { rol: this.rol, contenido: this.contenido };
  }

  static fromJSON(obj) {
    return new Mensaje(obj.rol, obj.contenido);
  }
}
