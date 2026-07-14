// Nota: el endpoint exacto de /auth/ no vino en el enunciado, se asume POST /auth/login con {usuario, clave} devolviendo {token}

const UrlBase = "https://worldcup26.ir";
const ClaveToken = "mundial26_token";
const ClaveFavoritos = "mundial26_favoritos";
const ClaveCachePartidos = "mundial26_cache_partidos";
const ClaveCacheEstadios = "mundial26_cache_estadios";

// Estado en memoria de la sesión actual
let PartidosEnMemoria = [];
let FavoritosEnMemoria = new Set();
let AccionPendienteTrasLogin = null;
// Mapa id de estadio -> datos del estadio, se llena cuando /get/stadiums responde
let EstadiosPorId = {};

// Referencias al DOM que se reutilizan en varias funciones
const ContenedorPartidos = document.getElementById("lista-partidos");
const ContenedorEstadios = document.getElementById("lista-estadios");
const BannerOffline = document.getElementById("banner-offline");
const ModalLogin = document.getElementById("modal-login");
const FormularioLogin = document.getElementById("formulario-login");
const ErrorLogin = document.getElementById("error-login");
const ErrorPartidos = document.getElementById("error-partidos");
const ErrorEstadios = document.getElementById("error-estadios");
const SelectEstadio = document.getElementById("filtro-estadio");
const SelectFecha = document.getElementById("filtro-fecha");
const PlantillaPartido = document.getElementById("plantilla-partido");

// Wrapper único de fetch que agrega el token y traduce los fallos a códigos internos
async function PeticionApi(ruta) {
  const token = localStorage.getItem(ClaveToken) || "";
  let respuesta;
  try {
    respuesta = await fetch(UrlBase + ruta, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (errorDeRed) {
    throw new Error("ERROR_RED");
  }
  if (respuesta.status === 401) {
    throw new Error("ERROR_401");
  }
  if (!respuesta.ok) {
    // Se deja el status real en consola para poder diagnosticar sin adivinar
    console.error(`Fallo en ${ruta}: status ${respuesta.status}`);
    throw new Error("ERROR_SERVIDOR");
  }
  try {
    return await respuesta.json();
  } catch (errorDeParseo) {
    // La respuesta llegó con status ok pero el cuerpo no es JSON valido
    console.error(`Respuesta de ${ruta} no es JSON valido`, errorDeParseo);
    throw new Error("ERROR_SERVIDOR");
  }
}

// Carga de partidos, totalmente independiente de la carga de estadios
async function CargarPartidos() {
  try {
    const respuesta = await PeticionApi("/get/games");
    // La API real envuelve el arreglo dentro de la propiedad "games"
    const datos = respuesta.games || respuesta;
    PartidosEnMemoria = datos;
    localStorage.setItem(ClaveCachePartidos, JSON.stringify(datos));
    ErrorPartidos.classList.add("oculto");
    PoblarFiltros(datos);
    RenderizarPartidos(datos);
  } catch (error) {
    ManejarErrorDeSeccion(error, "partidos");
  }
}

// Carga de estadios, con su propio try/catch separado del de partidos
async function CargarEstadios() {
  try {
    const respuesta = await PeticionApi("/get/stadiums");
    // Por si la API envuelve el arreglo, igual que hace con /get/games
    const datos = respuesta.stadiums || respuesta;
    localStorage.setItem(ClaveCacheEstadios, JSON.stringify(datos));
    ErrorEstadios.classList.add("oculto");
    ConstruirMapaEstadios(datos);
    RenderizarEstadios(datos);
    // Si los partidos ya se pintaron sin nombre de estadio, se repintan con el nombre correcto
    if (PartidosEnMemoria.length > 0) {
      RenderizarPartidos(PartidosEnMemoria);
    }
  } catch (error) {
    ManejarErrorDeSeccion(error, "estadios");
  }
}

function ConstruirMapaEstadios(listaEstadios) {
  EstadiosPorId = {};
  for (const estadio of listaEstadios) {
    EstadiosPorId[estadio.id] = estadio;
  }
}

// Punto único donde se decide qué hacer según el tipo de fallo
function ManejarErrorDeSeccion(error, seccion) {
  if (error.message === "ERROR_401") {
    const reintento = seccion === "partidos" ? CargarPartidos : CargarEstadios;
    AbrirModalLogin(reintento);
    return;
  }
  if (error.message === "ERROR_RED") {
    CargarDesdeCache(seccion);
    MostrarBannerOffline();
    return;
  }
  MostrarErrorDeSeccion(seccion, "No se pudo cargar la información, intente más tarde.");
}

// Respaldo local cuando la red falla por completo
function CargarDesdeCache(seccion) {
  const clave = seccion === "partidos" ? ClaveCachePartidos : ClaveCacheEstadios;
  const crudo = localStorage.getItem(clave);
  if (!crudo) {
    MostrarErrorDeSeccion(seccion, "No hay datos guardados para mostrar sin conexión.");
    return;
  }
  const datos = JSON.parse(crudo);
  if (seccion === "partidos") {
    PartidosEnMemoria = datos;
    PoblarFiltros(datos);
    RenderizarPartidos(datos);
  } else {
    RenderizarEstadios(datos);
  }
}

function MostrarErrorDeSeccion(seccion, texto) {
  const elemento = seccion === "partidos" ? ErrorPartidos : ErrorEstadios;
  elemento.textContent = texto;
  elemento.classList.remove("oculto");
}

function MostrarBannerOffline() {
  BannerOffline.classList.remove("oculto");
}

// Construye las 104 tarjetas en memoria y las inserta en una sola operación
function RenderizarPartidos(listaPartidos) {
  const fragmento = document.createDocumentFragment();
  for (const partido of listaPartidos) {
    const nodo = PlantillaPartido.content.cloneNode(true);
    const item = nodo.querySelector(".tarjeta-partido");
    const estadio = EstadiosPorId[partido.stadium_id];
    const nombreEstadio = estadio ? estadio.name_en : `Estadio #${partido.stadium_id}`;
    item.dataset.id = partido.id;
    item.dataset.estadio = partido.stadium_id;
    item.dataset.fecha = partido.local_date;
    nodo.querySelector(".tarjeta-partido__fecha").textContent = partido.local_date;
    nodo.querySelector(".tarjeta-partido__equipos").textContent = `${partido.home_team_name_en} vs ${partido.away_team_name_en}`;
    nodo.querySelector(".tarjeta-partido__estadio").textContent = nombreEstadio;
    const boton = nodo.querySelector(".boton-favorito");
    if (FavoritosEnMemoria.has(String(partido.id))) {
      boton.classList.add("es-favorito");
      boton.textContent = "★";
    }
    fragmento.appendChild(nodo);
  }
  // Una sola escritura al DOM real, sin ciclos de insercion individual
  ContenedorPartidos.innerHTML = "";
  ContenedorPartidos.appendChild(fragmento);
}

function RenderizarEstadios(listaEstadios) {
  const fragmento = document.createDocumentFragment();
  for (const estadio of listaEstadios) {
    const item = document.createElement("li");
    item.className = "tarjeta-estadio";
    item.textContent = `${estadio.name_en} — ${estadio.city_en}`;
    fragmento.appendChild(item);
  }
  ContenedorEstadios.innerHTML = "";
  ContenedorEstadios.appendChild(fragmento);
}

// Único listener del contenedor: identifica el partido con data-id del elemento clickeado
ContenedorPartidos.addEventListener("click", ManejarClicEnLista);

function ManejarClicEnLista(evento) {
  const boton = evento.target.closest(".boton-favorito");
  if (!boton) {
    return;
  }
  const tarjeta = boton.closest(".tarjeta-partido");
  const id = tarjeta.dataset.id;
  AlternarFavorito(id, boton);
}

function AlternarFavorito(id, boton) {
  if (FavoritosEnMemoria.has(id)) {
    FavoritosEnMemoria.delete(id);
    boton.classList.remove("es-favorito");
    boton.textContent = "☆";
  } else {
    FavoritosEnMemoria.add(id);
    boton.classList.add("es-favorito");
    boton.textContent = "★";
  }
  localStorage.setItem(ClaveFavoritos, JSON.stringify([...FavoritosEnMemoria]));
}

function CargarFavoritosGuardados() {
  const crudo = localStorage.getItem(ClaveFavoritos);
  FavoritosEnMemoria = crudo ? new Set(JSON.parse(crudo)) : new Set();
}

// Llena los selects de filtro con valores únicos sacados de los partidos ya cargados
function PoblarFiltros(listaPartidos) {
  const idsEstadio = [...new Set(listaPartidos.map((p) => p.stadium_id))].sort();
  const fechas = [...new Set(listaPartidos.map((p) => p.local_date))].sort();
  SelectEstadio.innerHTML = '<option value="todos">Todos los estadios</option>';
  for (const idEstadio of idsEstadio) {
    const opcion = document.createElement("option");
    opcion.value = idEstadio;
    opcion.textContent = EstadiosPorId[idEstadio] ? EstadiosPorId[idEstadio].name_en : `Estadio #${idEstadio}`;
    SelectEstadio.appendChild(opcion);
  }
  SelectFecha.innerHTML = '<option value="todos">Todas las fechas</option>';
  for (const fecha of fechas) {
    const opcion = document.createElement("option");
    opcion.value = fecha;
    opcion.textContent = fecha;
    SelectFecha.appendChild(opcion);
  }
}

// Filtrar solo oculta/muestra tarjetas ya existentes, no vuelve a insertar nodos
function AplicarFiltros() {
  const estadioElegido = SelectEstadio.value;
  const fechaElegida = SelectFecha.value;
  const tarjetas = ContenedorPartidos.querySelectorAll(".tarjeta-partido");
  for (const tarjeta of tarjetas) {
    const pasaEstadio = estadioElegido === "todos" || tarjeta.dataset.estadio === estadioElegido;
    const pasaFecha = fechaElegida === "todos" || tarjeta.dataset.fecha === fechaElegida;
    tarjeta.classList.toggle("oculto", !(pasaEstadio && pasaFecha));
  }
}

SelectEstadio.addEventListener("change", AplicarFiltros);
SelectFecha.addEventListener("change", AplicarFiltros);

// Abre el modal de re-autenticación y recuerda qué función reintentar al terminar
function AbrirModalLogin(funcionAReintentar) {
  AccionPendienteTrasLogin = funcionAReintentar;
  ModalLogin.classList.remove("oculto");
}

function CerrarModalLogin() {
  ModalLogin.classList.add("oculto");
  ErrorLogin.classList.add("oculto");
  FormularioLogin.reset();
}

FormularioLogin.addEventListener("submit", ManejarEnvioLogin);

async function ManejarEnvioLogin(evento) {
  evento.preventDefault();
  const email = document.getElementById("campo-usuario").value;
  const clave = document.getElementById("campo-clave").value;
  try {
    // Ruta real segun la documentacion del proyecto: /auth/authenticate, cuerpo {email, password}
    const respuesta = await fetch(`${UrlBase}/auth/authenticate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: clave })
    });
    if (!respuesta.ok) {
      throw new Error("CREDENCIALES_INVALIDAS");
    }
    const datos = await respuesta.json();
    localStorage.setItem(ClaveToken, datos.token);
    CerrarModalLogin();
    if (AccionPendienteTrasLogin) {
      await AccionPendienteTrasLogin();
    }
  } catch (error) {
    ErrorLogin.textContent = "Usuario o contraseña incorrectos, o el servidor no respondió.";
    ErrorLogin.classList.remove("oculto");
  }
}

// Arranque de la aplicación: ambas cargas se disparan por separado, ninguna espera a la otra
async function Inicializar() {
  CargarFavoritosGuardados();
  CargarEstadios();
  CargarPartidos();
}

document.addEventListener("DOMContentLoaded", Inicializar);