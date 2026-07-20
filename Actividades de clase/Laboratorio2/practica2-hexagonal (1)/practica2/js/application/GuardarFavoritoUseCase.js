/* ############################################################
   CASO DE USO — GuardarFavoritoUseCase
   ############################################################ */

export class GuardarFavoritoUseCase {
  /**
   * @param {import("../ports/FavoritosRepositoryPort.js").FavoritosRepositoryPort} favoritosRepo
   * @param {import("../ports/UIPort.js").UIPort} ui
   */
  constructor(favoritosRepo, ui) {
    this._favoritosRepo = favoritosRepo;
    this._ui = ui;
  }

  ejecutar() {
    const texto = this._ui.leerInputPrompt();
    if (!texto) return;
    const favoritos = this._favoritosRepo.agregar(texto);
    this._ui.pintarFavoritos(favoritos, (t) => this._ui.setInputPrompt(t));
  }
}
