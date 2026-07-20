/* ############################################################
   CASO DE USO — RefrescarEstadoTokenUseCase
   Lee el estado actual del token y le pide a la UI que
   actualice el badge. Se ejecuta cada segundo desde el
   composition root (app.js) vía setInterval.
   ############################################################ */

export class RefrescarEstadoTokenUseCase {
  /**
   * @param {import("../ports/TokenRepositoryPort.js").TokenRepositoryPort} tokenRepo
   * @param {import("../ports/UIPort.js").UIPort} ui
   */
  constructor(tokenRepo, ui) {
    this._tokenRepo = tokenRepo;
    this._ui = ui;
  }

  /** @returns {number} milisegundos restantes (para que app.js decida si detener el interval) */
  ejecutar() {
    const restante = this._tokenRepo.obtener().tiempoRestanteMs();
    this._ui.actualizarBadge(restante);
    return restante;
  }
}
