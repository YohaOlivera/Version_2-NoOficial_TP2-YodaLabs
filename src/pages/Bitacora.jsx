import { useState } from 'react';
import { SpaceBackground } from '../components/SpaceBackground';

// Datos de la bitácora migrados de tu HTML original
const registrosBitacora = [
  { fecha: '2026-09-21', fase: 'Organización', avance: 'Estructura base y repo compartido', descripcion: 'Creación del repositorio en GitHub, acuerdo de pautas de trabajo, branch workflow y definición inicial de archivos y carpetas.', dificultad: 'Disparidad de configuraciones locales y duplicación de carpetas iniciales.', resolucion: 'Se acordó la arquitectura oficial: archivos HTML en la raíz, carpetas css/, js/ e img/.', responsables: 'Leonel & Maximiliano', claseBadge: '' },
  { fecha: '2026-09-22', fase: 'Diseño', avance: 'Rediseño galáctico "Yoda Labs"', descripcion: 'Evolución estética completa: canvas espacial interactivo en JavaScript, paleta espacial y tipografías temáticas.', dificultad: 'Asegurar que el canvas de partículas no bloquee los eventos en dispositivos móviles.', resolucion: 'Uso de requestAnimationFrame con recálculo dinámico de dimensiones y z-index: -1 fijo.', responsables: 'Itziar & Yohana', claseBadge: 'diseno' },
  { fecha: '2026-09-23', fase: 'Arquitectura', avance: 'Limpieza de rutas y perfiles individuales', descripcion: 'Eliminación de plantillas duplicadas en subcarpetas. Estandarización de perfiles en la raíz.', dificultad: 'Rutas relativas rotas en enlaces y recursos CSS/JS al mover archivos de pages/ a la raíz.', resolucion: 'Refactorización integral de rutas relativas directas y saneamiento del historial de Git.', responsables: 'Leonel & Melisa', claseBadge: 'codigo' },
  { fecha: '2026-09-23', fase: 'Contenido', avance: 'Tarjetas Flip 3D y multimedia de integrantes', descripcion: 'Implementación de tarjeta interactiva con efecto 3D flip al clic, galerías de películas y discos.', dificultad: 'En pantallas chicas, la rotación 3D desbordaba o truncaba el texto de las dos caras de la tarjeta.', resolucion: 'Ajuste responsive mediante media query adaptando el flujo a vista vertical accesible.', responsables: 'Maximiliano & Itziar', claseBadge: 'multimedia' },
  { fecha: '2026-09-25', fase: 'Consolidación', avance: 'Integración de bitácora y QA', descripcion: 'Implementación final de la bitácora con diseño unificado y revisión minuciosa del contenido.', dificultad: 'La bitácora original mantenía estilos genéricos antiguos que rompían la identidad visual del proyecto.', resolucion: 'Reescritura completa con css/bitacora.css, adaptación responsive y control de calidad de Melisa y Yohana.', responsables: 'Melisa & Yohana', claseBadge: 'entrega' },
  { fecha: '2026-09-26', fase: 'Refactorización', avance: 'Audio, Carrusel JS y Mini Cards', descripcion: 'Integración de controles interactivos (mini-cards) en el carrusel de staff y silenciamiento de audio en perfiles.', dificultad: 'El carrusel se desincronizaba al buscar tarjetas específicas y el autoplay generaba advertencias de sonido.', resolucion: 'Algoritmo de búsqueda bidireccional implementado en JS; mute forzado en páginas personales.', responsables: 'Equipo completo', claseBadge: 'codigo' },
  // NUEVO REGISTRO TP2:
  { fecha: '2026-10-22', fase: 'Migración React', avance: 'Inicialización de Vite y Enrutamiento', descripcion: 'Migración del proyecto estático a React utilizando Vite y react-router-dom.', dificultad: 'Adaptación del canvas espacial y scripts globales al ciclo de vida de React.', resolucion: 'Implementación de useEffect y useRef para aislar la manipulación del DOM.', responsables: 'Yohana & Equipo', claseBadge: 'codigo' }
];

export function Bitacora() {
  const [filtroFase, setFiltroFase] = useState('Todas');

  // Obtener fases únicas para los botones del filtro
  const fasesUnicas = ['Todas', ...new Set(registrosBitacora.map(reg => reg.fase))];

  // Filtrar los registros según la selección
  const registrosFiltrados = filtroFase === 'Todas' 
    ? registrosBitacora 
    : registrosBitacora.filter(reg => reg.fase === filtroFase);

  return (
    <main className="contenedor-bitacora">
      <SpaceBackground />
      
      <section className="bitacora-header" style={{ position: 'relative', zIndex: 1 }}>
        <p className="subtitulo-seccion">Proceso de Trabajo · TP1 & TP2</p>
        <h1 className="titulo-bitacora">Bitácora de Desarrollo</h1>
        <p className="descripcion-bitacora">
          Registro cronológico de acuerdos, decisiones técnicas, dificultades superadas y coordinación del equipo Yoda Labs para el desarrollo del sitio colaborativo.
        </p>
      </section>

      {/* Controles de Filtro (Criterio 14 - Nivel Propone) */}
      <section style={{ marginBottom: '2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {fasesUnicas.map(fase => (
            <button 
              key={fase}
              onClick={() => setFiltroFase(fase)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: filtroFase === fase ? 'rgba(57, 255, 122, 0.2)' : 'rgba(9, 13, 20, 0.7)',
                color: filtroFase === fase ? '#39FF7A' : '#E2E8F0',
                border: `1px solid ${filtroFase === fase ? '#39FF7A' : '#1DB954'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--fuente-nav)',
                transition: 'all 0.3s ease'
              }}
            >
              {fase}
            </button>
          ))}
        </div>
      </section>

      <section className="tabla-bitacora-contenedor" style={{ position: 'relative', zIndex: 1 }}>
        <table className="tabla-bitacora">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Fase & Avance</th>
              <th>Dificultades encontradas</th>
              <th>Resolución</th>
              <th>Responsables</th>
            </tr>
          </thead>
          <tbody>
            {registrosFiltrados.map((registro, index) => (
              <tr key={index}>
                <td className="celda-fecha">{registro.fecha}</td>
                <td className="celda-avance">
                  <span className={`badge-fase ${registro.claseBadge}`}>{registro.fase}</span>
                  <strong>{registro.avance}</strong>
                  <p>{registro.descripcion}</p>
                </td>
                <td>{registro.dificultad}</td>
                <td>{registro.resolucion}</td>
                <td className="celda-responsables">{registro.responsables}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {registrosFiltrados.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem', color: '#a0aec0' }}>No hay registros para esta fase.</p>
        )}
      </section>
    </main>
  );
}