/* ############################################################
   PUERTO — LLMGatewayPort
   Contrato de salida (driven port) hacia el "mundo exterior":
   el LLM. La aplicación no sabe si detrás hay un simulador,
   un fetch real a OpenAI/Anthropic, etc.
   ############################################################ */

export class LLMGatewayPort {
  /**
   * @param {import("../domain/Conversacion.js").Conversacion} conversacion
   * @returns {Promise<{status: number, respuesta: string}>}
   * @throws {{status: 401|422, error: string}}
   */
  async enviarMensaje(conversacion) {
    throw new Error("LLMGatewayPort.enviarMensaje no implementado");
  }
}
