/* ############################################################
   CASO DE USO — IniciarSesionUseCase
   Emite un Token nuevo, válido por 2 minutos, y lo persiste
   vía el puerto de TokenRepository (Cookie en el adaptador real).
   ############################################################ */
import { Token } from "../domain/Token.js";

const DURACION_TOKEN_MS = 2 * 60 * 1000; // 2 minutos, exigido por la práctica

export class IniciarSesionUseCase {
  /** @param {import("../ports/TokenRepositoryPort.js").TokenRepositoryPort} tokenRepo */
  constructor(tokenRepo) {
    this._tokenRepo = tokenRepo;
  }

  ejecutar() {
    const token = Token.crear(DURACION_TOKEN_MS);
    this._tokenRepo.guardar(token, DURACION_TOKEN_MS);
    return token;
  }
}
