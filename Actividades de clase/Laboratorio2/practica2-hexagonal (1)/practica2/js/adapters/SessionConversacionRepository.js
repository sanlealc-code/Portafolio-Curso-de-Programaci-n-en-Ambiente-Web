/* ############################################################
   ADAPTADOR — SessionConversacionRepository
   Implementa ConversacionRepositoryPort usando sessionStorage.
   Ciclo de vida: dura mientras la PESTAÑA esté abierta. Al
   duplicar pestaña, sessionStorage nace vacío = hilo nuevo,
   sin código extra: es el comportamiento nativo del navegador.
   ############################################################ */
import { ConversacionRepositoryPort } from "../ports/ConversacionRepositoryPort.js";
import { Conversacion } from "../domain/Conversacion.js";

const KEY = "conversacion";

export class SessionConversacionRepository extends ConversacionRepositoryPort {
  obtener() {
    const crudo = sessionStorage.getItem(KEY);
    return crudo ? Conversacion.fromJSON(JSON.parse(crudo)) : Conversacion.vacia();
  }

  guardar(conversacion) {
    sessionStorage.setItem(KEY, JSON.stringify(conversacion.toJSON()));
  }

  limpiar() {
    sessionStorage.removeItem(KEY);
  }
}
