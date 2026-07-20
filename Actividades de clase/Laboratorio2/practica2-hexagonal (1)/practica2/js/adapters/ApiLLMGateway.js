/* ############################################################
   ADAPTADOR — ApiLLMGateway
   Implementa LLMGatewayPort delegando en ApiLLM (el simulador
   CONGELADO). Aquí, y solo aquí, la aplicación "toca" el
   módulo externo — el resto del código depende del puerto.
   ############################################################ */
import { LLMGatewayPort } from "../ports/LLMGatewayPort.js";
import { ApiLLM } from "../api-llm.js";

export class ApiLLMGateway extends LLMGatewayPort {
  async enviarMensaje(conversacion) {
    return ApiLLM.enviar(conversacion.toJSON());
  }
}
