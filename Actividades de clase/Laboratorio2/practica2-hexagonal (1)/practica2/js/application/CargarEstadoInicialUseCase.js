/* ############################################################
   CASO DE USO — CargarEstadoInicialUseCase
   Pinta en la UI lo que ya existía en storage al recargar la
   página: conversación de la pestaña (sessionStorage) y
   favoritos (localStorage).
   ############################################################ */

export class CargarEstadoInicialUseCase {
  /**
   * @param {import("../ports/ConversacionRepositoryPort.js").ConversacionRepositoryPort} conversacionRepo
   * @param {import("../ports/FavoritosRepositoryPort.js").FavoritosRepositoryPort} favoritosRepo
   * @param {import("../ports/UIPort.js").UIPort} ui
   */
  constructor(conversacionRepo, favoritosRepo, ui) {
    this._conversacionRepo = conversacionRepo;
    this._favoritosRepo = favoritosRepo;
    this._ui = ui;
  }

  ejecutar() {
    this._conversacionRepo
      .obtener()
      .mensajes.forEach((m) => this._ui.pintarMensaje(m.rol, m.contenido));

    this._ui.pintarFavoritos(this._favoritosRepo.obtenerTodos(), (t) =>
      this._ui.setInputPrompt(t)
    );
  }
}
