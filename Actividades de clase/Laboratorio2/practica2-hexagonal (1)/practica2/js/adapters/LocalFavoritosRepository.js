/* ############################################################
   ADAPTADOR — LocalFavoritosRepository
   Implementa FavoritosRepositoryPort usando localStorage.
   Ciclo de vida: sobrevive a cerrar/reabrir el navegador.
   ############################################################ */
import { FavoritosRepositoryPort } from "../ports/FavoritosRepositoryPort.js";

const KEY = "favoritos";

export class LocalFavoritosRepository extends FavoritosRepositoryPort {
  obtenerTodos() {
    const crudo = localStorage.getItem(KEY);
    return crudo ? JSON.parse(crudo) : [];
  }

  agregar(texto) {
    const favoritos = this.obtenerTodos();
    favoritos.push(texto);
    localStorage.setItem(KEY, JSON.stringify(favoritos));
    return favoritos;
  }
}
