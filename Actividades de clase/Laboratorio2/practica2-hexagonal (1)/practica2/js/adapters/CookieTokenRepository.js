/* ############################################################
   ADAPTADOR — CookieTokenRepository
   Implementa TokenRepositoryPort usando document.cookie.
   Nombre y formato deben calzar EXACTO con lo que exige
   ApiLLM ("llm_token" = "tk_<epochMsExpiracion>").
   ############################################################ */
import { TokenRepositoryPort } from "../ports/TokenRepositoryPort.js";
import { Token } from "../domain/Token.js";

const COOKIE_NAME = "llm_token";

export class CookieTokenRepository extends TokenRepositoryPort {
  guardar(token, duracionMs) {
    document.cookie = `${COOKIE_NAME}=${token.valorCrudo}; max-age=${Math.floor(duracionMs / 1000)}; path=/`;
  }

  obtener() {
    const m = document.cookie.match(new RegExp("(?:^|;\\s*)" + COOKIE_NAME + "=([^;]+)"));
    const crudo = m ? decodeURIComponent(m[1]) : null;
    return new Token(crudo);
  }
}
