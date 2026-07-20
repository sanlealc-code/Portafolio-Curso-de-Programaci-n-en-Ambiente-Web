/* ############################################################
   DOMINIO — Token
   Entidad pura: no sabe nada de cookies, DOM ni almacenamiento.
   Solo conoce las reglas de negocio de un Access Token.
   ############################################################ */

const FORMATO = /^tk_(\d+)$/;

export class Token {
  /** @param {string|null} valorCrudo valor tal cual viene del storage (ej: "tk_1234567890") */
  constructor(valorCrudo) {
    this._crudo = valorCrudo || null;
  }

  /** Fábrica: crea un token nuevo válido por `duracionMs` a partir de ahora. */
  static crear(duracionMs) {
    const expiraEn = Date.now() + duracionMs;
    return new Token(`tk_${expiraEn}`);
  }

  /** Fábrica: representa "sin token". */
  static vacio() {
    return new Token(null);
  }

  get valorCrudo() {
    return this._crudo;
  }

  esValido() {
    if (!this._crudo) return false;
    const m = this._crudo.match(FORMATO);
    if (!m) return false;
    return Date.now() < Number(m[1]);
  }

  tiempoRestanteMs() {
    if (!this._crudo) return -1;
    const m = this._crudo.match(FORMATO);
    return m ? Number(m[1]) - Date.now() : -1;
  }
}
