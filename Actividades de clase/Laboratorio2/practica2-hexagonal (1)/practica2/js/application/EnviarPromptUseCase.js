/* ############################################################
   CASO DE USO — EnviarPromptUseCase
   Orquesta: leer conversación, agregar mensaje del usuario,
   validar token, llamar al LLM, manejar el 401 borrando SOLO
   la conversación (nunca los favoritos).
   Depende únicamente de PUERTOS (abstracciones), nunca de
   sessionStorage/localStorage/cookie/DOM concretos.
   ############################################################ */
import { Mensaje } from "../domain/Mensaje.js";

export class EnviarPromptUseCase {
  /**
   * @param {import("../ports/ConversacionRepositoryPort.js").ConversacionRepositoryPort} conversacionRepo
   * @param {import("../ports/TokenRepositoryPort.js").TokenRepositoryPort} tokenRepo
   * @param {import("../ports/LLMGatewayPort.js").LLMGatewayPort} llmGateway
   * @param {import("../ports/UIPort.js").UIPort} ui
   */
  constructor(conversacionRepo, tokenRepo, llmGateway, ui) {
    this._conversacionRepo = conversacionRepo;
    this._tokenRepo = tokenRepo;
    this._llmGateway = llmGateway;
    this._ui = ui;
  }

  async ejecutar() {
    const texto = this._ui.leerInputPrompt();
    if (!texto) return;

    let conversacion = this._conversacionRepo.obtener();
    conversacion = conversacion.agregar(new Mensaje("user", texto));
    this._conversacionRepo.guardar(conversacion);
    this._ui.pintarMensaje("user", texto);
    this._ui.limpiarInputPrompt();

    try {
      // 1) Leer y validar la cookie ANTES de disparar la petición
      //    (falla rápido con 401 sin esperar la latencia simulada).
      if (!this._tokenRepo.obtener().esValido()) {
        throw { status: 401, error: "TOKEN_AUSENTE_MALFORMADO_O_EXPIRADO" };
      }

      const data = await this._llmGateway.enviarMensaje(conversacion);
      conversacion = conversacion.agregar(new Mensaje("ia", data.respuesta));
      this._conversacionRepo.guardar(conversacion);
      this._ui.pintarMensaje("ia", data.respuesta);
    } catch (error) {
      if (error && error.status === 401) {
        // Se pierde SOLO la conversación; los favoritos quedan intactos
        // porque viven en un puerto/adaptador completamente distinto.
        this._conversacionRepo.limpiar();
        this._ui.limpiarConversacionUI();
        this._ui.mostrarModal();
      } else {
        console.error("Error inesperado al enviar el prompt:", error);
      }
    }
  }
}
