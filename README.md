# TP2 - Yoda Labs 🌌

## Índice
- [Descripción](#descripción)
- [Sitio publicado](#sitio-publicado)
- [Integrantes](#integrantes)
- [Capturas](#capturas)
- [Responsabilidades](#responsabilidades)
- [Uso de IA por integrante](#uso-de-ia-por-integrante)

---

## Descripción

**Yoda Labs** es una Single Page Application (SPA) desarrollada con **React y Vite**. El proyecto representa el portafolio y centro de operaciones de nuestro escuadrón de desarrollo. La interfaz está diseñada con un enfoque *Desktop-First* y una fuerte temática espacial, integrando componentes dinámicos y modulares. 

Entre sus características principales incluye:
- **Enrutamiento dinámico** con `react-router-dom`.
- **Bitácora de Desarrollo:** Un registro interactivo con tarjetas colapsables animadas y un sistema de filtrado avanzado (AND lógico) mediante menús desplegables personalizados.
- **Armería Holocrón (Recursos):** Visualización filtrable de nuestro stack tecnológico.
- **Consumo de API Externa:** Integración con una API pública de Star Wars para generar holocrones aleatorios y un mini-juego interactivo de memoria con temporizador y sistema de puntaje.
- **Árbol de Componentes:** Visualización recursiva de la arquitectura de renderizado de React simulando una terminal de código.
- **Perfiles Dinámicos:** Tarjetas 3D (Flip Cards) inmersivas para cada miembro del equipo.

## Sitio publicado

- **Vercel:** [Reemplazar con la URL de Vercel de Yoda Labs]

## Integrantes

| Nombre y apellido | Perfil de GitHub |
| :--- | :--- |
| Leonel Díaz | [GitHub de Leonel](https://github.com/LeonelDiaz225) |
| Maximiliano Millan | [GitHub de Maximiliano](https://github.com/MaxiMillan) |
| Yohana Olivera | [GitHub de Yohana](https://github.com/YohaOlivera) |
| Melisa Solano | [GitHub de Melisa](https://github.com/MelisaSolano) |
| Itziar Urriola | [GitHub de Itziar](https://github.com/ItziarUrriola) |

*(Nota: Actualizar los enlaces de GitHub con los perfiles reales correspondientes)*

---

## Ampliaciones para el nivel Propone / Supera

### Capturas

| Inicio (Hero & Staff) | Bitácora de Desarrollo |
| :---: | :---: |
| ![Inicio](./public/img/captura-inicio.jpg) <br> *Landing page con carrusel interactivo y canvas espacial.* | ![Bitácora](./public/img/captura-bitacora.jpg) <br> *Sistema de tarjetas colapsables con filtros combinados dinámicos.* |

| API Pública (Mini-Juego) | Árbol de Renderizado |
| :---: | :---: |
| ![API](./public/img/captura-api.jpg) <br> *Consumo de API externa y juego de memoria Jedi.* | ![Árbol](./public/img/captura-arbol.jpg) <br> *Visualizador recursivo de la jerarquía de componentes de React.* |

*(Nota: Las rutas de las imágenes son ilustrativas. Deberán tomar capturas de la web terminada, guardarlas en la carpeta respectiva y actualizar estos enlaces si lo desean, o eliminar esta nota).*

### Responsabilidades

| Integrante | Responsabilidad en el proyecto |
| :--- | :--- |
| **Leonel Díaz** | Arquitectura base, configuración del enrutamiento (Router), gestión de repositorios, estandarización de componentes y refactorización del árbol. |
| **Maximiliano Millan** | Ingeniería del Core Frontend, fetch y manejo de datos de la API externa (Star Wars), lógica de estados del mini-juego de memoria. |
| **Yohana Olivera** | Lógica de filtrado combinado en la Bitácora, mapeo de datos JSON, estados de componentes UI (Custom Selects) y revisión estructural. |
| **Melisa Solano** | Maquetación y redacción de documentación (README), testing de usabilidad, control de calidad (QA) y gestión de registros de la Bitácora. |
| **Itziar Urriola** | Diseño UI/UX, estandarización tipográfica, animaciones CSS (Tarjetas Flip, menús desplegables), *Responsive Design* y paleta de colores. |

### Uso de IA por integrante

| Integrante | Aplicación | Modelo | Contenido o tarea |
| :--- | :--- | :--- | :--- |
| **Leonel Díaz** | Google Gemini | Gemini 3.1 Pro | Asistencia en la refactorización de JSX a componentes modulares y estructuración de la navegación dinámica. |
| **Maximiliano Millan** | Google Gemini | Gemini 3.1 Pro | Generación de lógica (useEffect) para evitar Layout Shifts con la API y filtrado de IDs nulos para el juego. |
| **Yohana Olivera** | Google Gemini | Gemini 3.1 Pro | Diseño del algoritmo de filtrado AND para la bitácora y mapeo de nombres de interfaz a valores JSON. |
| **Melisa Solano** | Google Gemini | Gemini 3.1 Pro | Estructuración y formato avanzado Markdown para el archivo README.md siguiendo plantillas de evaluación. |
| **Itziar Urriola** | Google Gemini | Gemini 3.1 Pro | Resolución de recortes en menús desplegables (`max-height` / `overflow`), y transiciones fluidas en CSS Grid. |