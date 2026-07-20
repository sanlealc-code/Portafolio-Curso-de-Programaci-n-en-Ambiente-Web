/* ############################################################
   ADAPTADOR — DomUIAdapter
   Implementa UIPort tocando el DOM. Único módulo que conoce
   IDs de elementos, clases CSS, etc. La aplicación nunca
   importa esto directamente: solo conoce UIPort.
   ############################################################ */
import { UIPort } from "../ports/UIPort.js";

const $ = (id) => document.getElementById(id);

export class DomUIAdapter extends UIPort {
  leerInputPrompt() {
    return $("prompt").value.trim();
  }
  limpiarInputPrompt() {
    $("prompt").value = "";
  }
  setInputPrompt(texto) {
    $("prompt").value = texto;
  }

  pintarMensaje(rol, contenido) {
    const div = document.createElement("div");
    div.className = "msg " + rol;
    div.textContent = contenido;
    $("conversacion").appendChild(div);
    $("conversacion").scrollTop = $("conversacion").scrollHeight;
  }
  limpiarConversacionUI() {
    $("conversacion").innerHTML = "";
  }

  pintarFavoritos(favoritos, onUsar) {
    const lista = $("listaFavoritos");
    lista.innerHTML = "";
    favoritos.forEach((texto) => {
      const div = document.createElement("div");
      div.className = "fav";
      div.textContent = texto;

      const btn = document.createElement("button");
      btn.textContent = "Usar ▸";
      btn.addEventListener("click", () => onUsar(texto));

      div.appendChild(document.createElement("br"));
      div.appendChild(btn);
      lista.appendChild(div);
    });
  }

  mostrarModal() {
    $("modal").classList.add("visible");
  }
  ocultarModal() {
    $("modal").classList.remove("visible");
  }

  actualizarBadge(restanteMs) {
    if (!restanteMs || restanteMs <= 0) {
      $("badgeToken").textContent = "🍪 Sin sesión";
      return;
    }
    const totalSeg = Math.ceil(restanteMs / 1000);
    const mm = String(Math.floor(totalSeg / 60)).padStart(2, "0");
    const ss = String(totalSeg % 60).padStart(2, "0");
    $("badgeToken").textContent = `⏱ Token expira en ${mm}:${ss}`;
  }

  onEnviarPrompt(callback) {
    $("btnEnviar").addEventListener("click", callback);
    $("prompt").addEventListener("keydown", (e) => {
      if (e.key === "Enter") callback();
    });
  }
  onGuardarFavorito(callback) {
    $("btnGuardarFav").addEventListener("click", callback);
  }
  onIniciarSesion(callback) {
    $("btnLogin").addEventListener("click", callback);
  }
  onCerrarModal(callback) {
    $("btnCerrarModal").addEventListener("click", callback);
  }
}
