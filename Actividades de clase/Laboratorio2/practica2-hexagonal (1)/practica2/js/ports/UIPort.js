/* ############################################################
   PUERTO — UIPort
   Contrato hacia la capa de presentación. Los casos de uso le
   piden a "una UI" que pinte cosas, sin saber que es el DOM.
   ############################################################ */

export class UIPort {
  leerInputPrompt() { throw new Error("UIPort.leerInputPrompt no implementado"); }
  limpiarInputPrompt() { throw new Error("UIPort.limpiarInputPrompt no implementado"); }
  setInputPrompt(_texto) { throw new Error("UIPort.setInputPrompt no implementado"); }

  pintarMensaje(_rol, _contenido) { throw new Error("UIPort.pintarMensaje no implementado"); }
  limpiarConversacionUI() { throw new Error("UIPort.limpiarConversacionUI no implementado"); }

  pintarFavoritos(_favoritos, _onUsar) { throw new Error("UIPort.pintarFavoritos no implementado"); }

  mostrarModal() { throw new Error("UIPort.mostrarModal no implementado"); }
  ocultarModal() { throw new Error("UIPort.ocultarModal no implementado"); }

  actualizarBadge(_restanteMs) { throw new Error("UIPort.actualizarBadge no implementado"); }

  onEnviarPrompt(_callback) { throw new Error("UIPort.onEnviarPrompt no implementado"); }
  onGuardarFavorito(_callback) { throw new Error("UIPort.onGuardarFavorito no implementado"); }
  onIniciarSesion(_callback) { throw new Error("UIPort.onIniciarSesion no implementado"); }
  onCerrarModal(_callback) { throw new Error("UIPort.onCerrarModal no implementado"); }
}
