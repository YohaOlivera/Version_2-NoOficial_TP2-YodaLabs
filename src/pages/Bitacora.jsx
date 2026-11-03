import { useState } from 'react';
import { SpaceBackground } from '../components/SpaceBackground';
import '../styles/bitacora.css';
import registrosBitacora from '../data/bitacora.json';

// Objeto de correspondencias: Mapea el nombre completo del UI al nombre corto del JSON
const integrantesMap = {
  "Leonel Díaz": "Leonel",
  "Maximiliano Millan": "Maximiliano",
  "Yohana Olivera": "Yohana",
  "Melisa Solano": "Melisa",
  "Itziar Urriola": "Itziar"
};

// Listas de opciones para los menús
const opcionesEtiqueta = [
  'Todas las etiquetas', 'Planificación', 'Organización', 'Diseño', 
  'Arquitectura', 'Estructura', 'Contenido', 'Refactorización', 
  'Corrección', 'Documentación', 'Pruebas'
];
const opcionesEtapa = ['Todas las etapas', 'E1 - TP1', 'E2 - TP2'];
const opcionesIntegrante = [
  'Todos los integrantes', 'Leonel Díaz', 'Maximiliano Millan', 
  'Yohana Olivera', 'Melisa Solano', 'Itziar Urriola'
];

// Subcomponente: Tarjeta individual
const TarjetaBitacora = ({ registro }) => {
  const [expandido, setExpandido] = useState(false);

  const obtenerClaseEtiqueta = (etiqueta) => {
    const clases = {
      'Planificación': 'badge-planificacion',
      'Organización': 'badge-organizacion',
      'Diseño': 'badge-diseno',
      'Arquitectura': 'badge-arquitectura',
      'Estructura': 'badge-estructura',
      'Contenido': 'badge-contenido',
      'Refactorización': 'badge-refactorizacion',
      'Corrección': 'badge-correccion',
      'Documentación': 'badge-documentacion',
      'Pruebas': 'badge-pruebas'
    };
    return clases[etiqueta] || 'badge-default';
  };

  return (
    <article className="tarjeta-bitacora">
      <div className="tarjeta-bitacora-header">
        <span className={`badge-etiqueta ${obtenerClaseEtiqueta(registro.etiqueta)}`}>
          {registro.etiqueta}
        </span>
        <div className="tarjeta-meta">
          <span className="meta-etapa">{registro.etapa}</span>
          <span className="meta-fecha">{registro.fecha}</span>
        </div>
      </div>
      
      <div className="tarjeta-bitacora-body">
        <p className="registro-responsables">
          <strong>Responsables:</strong> {registro.responsables.join(' & ')}
        </p>
        <p className="registro-resumen">{registro.resumen}</p>
      </div>

      <div className="tarjeta-toggle" onClick={() => setExpandido(!expandido)}>
        <span className="toggle-texto">{expandido ? 'Ocultar detalles' : 'Ver detalles'}</span>
        <svg className={`toggle-icono ${expandido ? 'girado' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      <div className={`tarjeta-expandible ${expandido ? 'abierto' : ''}`}>
        <div className="expandible-contenido">
          <div className="linea-divisoria-interna"></div>
          <div className="detalle-bloque">
            <h4>Dificultad</h4>
            <p>{registro.dificultad}</p>
          </div>
          <div className="detalle-bloque">
            <h4>Resolución</h4>
            <p>{registro.resolucion}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

// Componente Principal
export function Bitacora() {
  // Estados de los filtros
  const [filtroEtiqueta, setFiltroEtiqueta] = useState('Todas las etiquetas');
  const [filtroEtapa, setFiltroEtapa] = useState('Todas las etapas');
  const [filtroIntegrante, setFiltroIntegrante] = useState('Todos los integrantes');
  
  // Estado único para controlar qué menú está abierto
  const [dropdownAbierto, setDropdownAbierto] = useState(null); 

  // Lógica de apertura/cierre de menús
  const toggleDropdown = (menuName) => {
    setDropdownAbierto(prev => prev === menuName ? null : menuName);
  };

  const restablecerFiltros = () => {
    setFiltroEtiqueta('Todas las etiquetas');
    setFiltroEtapa('Todas las etapas');
    setFiltroIntegrante('Todos los integrantes');
    setDropdownAbierto(null);
  };

  // Filtrado combinado (AND lógico)
  const registrosFiltrados = registrosBitacora.filter(reg => {
    // Filtro 1: Etiqueta
    const coincideEtiqueta = filtroEtiqueta === 'Todas las etiquetas' || reg.etiqueta === filtroEtiqueta;
    
    // Filtro 2: Etapa
    const coincideEtapa = filtroEtapa === 'Todas las etapas' || reg.etapa === filtroEtapa;
    
    // Filtro 3: Integrante (Mapeo a nombre corto + verificación global)
    let coincideIntegrante = true;
    if (filtroIntegrante !== 'Todos los integrantes') {
      const nombreCorto = integrantesMap[filtroIntegrante];
      coincideIntegrante = reg.responsables.includes(nombreCorto) || reg.responsables.includes("Todo el equipo");
    }

    return coincideEtiqueta && coincideEtapa && coincideIntegrante;
  });

  // Orden Cronológico Descendente
  const registrosOrdenados = [...registrosFiltrados].sort((a, b) => b.id - a.id);

  return (
    <main className="contenedor-bitacora">
      <SpaceBackground />
      
      <section className="bitacora-header bitacora-layer">
        <p className="subtitulo-seccion">Proceso de Trabajo · TP1 & TP2</p>
        <h1 className="titulo-bitacora">Bitácora de Desarrollo</h1>
        <p className="descripcion-bitacora">
          Registro cronológico de acuerdos, decisiones técnicas, dificultades superadas y coordinación del equipo Yoda Labs para el desarrollo del sitio colaborativo.
        </p>
      </section>

      {/* SECCIÓN DE FILTROS PERSONALIZADOS */}
      <section className="bitacora-filtros bitacora-layer">
        
        {/* Desplegable: Etiqueta */}
        <div className="custom-select-container">
          <div 
            className={`custom-select-trigger ${dropdownAbierto === 'etiqueta' ? 'abierto' : ''}`}
            onClick={() => toggleDropdown('etiqueta')}
          >
            {filtroEtiqueta}
            <span className="custom-arrow"></span>
          </div>
          {dropdownAbierto === 'etiqueta' && (
            <ul className="custom-select-options">
              {opcionesEtiqueta.map(opcion => (
                <li 
                  key={opcion}
                  className={filtroEtiqueta === opcion ? 'seleccionado' : ''}
                  onClick={() => { setFiltroEtiqueta(opcion); setDropdownAbierto(null); }}
                >
                  {opcion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Desplegable: Etapa */}
        <div className="custom-select-container">
          <div 
            className={`custom-select-trigger ${dropdownAbierto === 'etapa' ? 'abierto' : ''}`}
            onClick={() => toggleDropdown('etapa')}
          >
            {filtroEtapa}
            <span className="custom-arrow"></span>
          </div>
          {dropdownAbierto === 'etapa' && (
            <ul className="custom-select-options">
              {opcionesEtapa.map(opcion => (
                <li 
                  key={opcion}
                  className={filtroEtapa === opcion ? 'seleccionado' : ''}
                  onClick={() => { setFiltroEtapa(opcion); setDropdownAbierto(null); }}
                >
                  {opcion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Desplegable: Integrante */}
        <div className="custom-select-container">
          <div 
            className={`custom-select-trigger ${dropdownAbierto === 'integrante' ? 'abierto' : ''}`}
            onClick={() => toggleDropdown('integrante')}
          >
            {filtroIntegrante}
            <span className="custom-arrow"></span>
          </div>
          {dropdownAbierto === 'integrante' && (
            <ul className="custom-select-options">
              {opcionesIntegrante.map(opcion => (
                <li 
                  key={opcion}
                  className={filtroIntegrante === opcion ? 'seleccionado' : ''}
                  onClick={() => { setFiltroIntegrante(opcion); setDropdownAbierto(null); }}
                >
                  {opcion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button onClick={restablecerFiltros} className="btn-limpiar-filtros">
          Limpiar Filtros
        </button>

      </section>

      {/* CONTADOR DE RESULTADOS */}
      <section className="bitacora-resultados bitacora-layer">
        <p className="contador-texto">
          Registros encontrados: <span className="contador-numero">{registrosOrdenados.length}</span>
        </p>
      </section>

      {/* GRILLA DE TARJETAS */}
      <section className="grilla-bitacora bitacora-layer">
        {registrosOrdenados.map((registro) => (
          <TarjetaBitacora key={registro.id} registro={registro} />
        ))}
        
        {registrosOrdenados.length === 0 && (
          <p className="mensaje-vacio">No existen registros que coincidan con los filtros seleccionados.</p>
        )}
      </section>
    </main>
  );
}