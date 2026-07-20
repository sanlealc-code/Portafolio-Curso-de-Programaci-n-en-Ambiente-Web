/* ############################################################
   APP — Composition Root
   Único lugar donde se instancian ADAPTADORES CONCRETOS y se
   inyectan en los casos de uso. Si mañana cambian sessionStorage
   por IndexedDB, o la Cookie por un header Authorization, esto
   es lo ÚNICO que cambia — el dominio y los casos de uso no
   se tocan (Principio de Inversión de Dependencias).
   ############################################################ */

// Adaptadores (infraestructura)
import { CookieTokenRepository } from "./adapters/CookieTokenRepository.js";
import { SessionConversacionRepository } from "./adapters/SessionConversacionRepository.js";
import { LocalFavoritosRepository } from "./adapters/LocalFavoritosRepository.js";
import { ApiLLMGateway } from "./adapters/ApiLLMGateway.js";
import { DomUIAdapter } from "./adapters/DomUIAdapter.js";

// Casos de uso (aplicación)
import { EnviarPromptUseCase } from "./application/EnviarPromptUseCase.js";
import { GuardarFavoritoUseCase } from "./application/GuardarFavoritoUseCase.js";
import { IniciarSesionUseCase } from "./application/IniciarSesionUseCase.js";
import { RefrescarEstadoTokenUseCase } from "./application/RefrescarEstadoTokenUseCase.js";
import { CargarEstadoInicialUseCase } from "./application/CargarEstadoInicialUseCase.js";

function inicializar() {
  // 1) Instanciar adaptadores (una sola vez, aquí y solo aquí)
  const tokenRepo = new CookieTokenRepository();
  const conversacionRepo = new SessionConversacionRepository();
  const favoritosRepo = new LocalFavoritosRepository();
  const llmGateway = new ApiLLMGateway();
  const ui = new DomUIAdapter();

  // 2) Inyectar adaptadores en los casos de uso
  const enviarPrompt = new EnviarPromptUseCase(conversacionRepo, tokenRepo, llmGateway, ui);
  const guardarFavorito = new GuardarFavoritoUseCase(favoritosRepo, ui);
  const iniciarSesion = new IniciarSesionUseCase(tokenRepo);
  const refrescarToken = new RefrescarEstadoTokenUseCase(tokenRepo, ui);
  const cargarEstadoInicial = new CargarEstadoInicialUseCase(conversacionRepo, favoritosRepo, ui);

  // 3) Conectar eventos de UI -> casos de uso
  let intervaloBadge = null;

  function reiniciarContadorBadge() {
    if (intervaloBadge) clearInterval(intervaloBadge);
    tick();
    intervaloBadge = setInterval(tick, 1000);
  }
  function tick() {
    const restante = refrescarToken.ejecutar();
    if (restante <= 0 && intervaloBadge) {
      clearInterval(intervaloBadge);
      intervaloBadge = null;
    }
  }

  ui.onEnviarPrompt(() => enviarPrompt.ejecutar());
  ui.onGuardarFavorito(() => guardarFavorito.ejecutar());
  ui.onIniciarSesion(() => {
    iniciarSesion.ejecutar();
    reiniciarContadorBadge();
  });
  ui.onCerrarModal(() => ui.ocultarModal());

  // 4) Estado inicial al cargar/recargar la página
  cargarEstadoInicial.ejecutar();
  tick();
  if (tokenRepo.obtener().esValido()) reiniciarContadorBadge();
}

document.addEventListener("DOMContentLoaded", inicializar);
