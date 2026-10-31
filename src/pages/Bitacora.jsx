import { useState } from 'react';
import { SpaceBackground } from '../components/SpaceBackground';

// Importación Bitacora JSON
import registrosBitacora from '../data/bitacora.json'; 

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
      
      <section className="bitacora-header bitacora-layer">
        <p className="subtitulo-seccion">Proceso de Trabajo · TP1 & TP2</p>
        <h1 className="titulo-bitacora">Bitácora de Desarrollo</h1>
        <p className="descripcion-bitacora">
          Registro cronológico de acuerdos, decisiones técnicas, dificultades superadas y coordinación del equipo Yoda Labs para el desarrollo del sitio colaborativo.
        </p>
      </section>

      {/* Controles de Filtro */}
      <section className="bitacora-filtros bitacora-layer">
        <div className="filtro-botones-contenedor">
          {fasesUnicas.map(fase => {
            const isActive = filtroFase === fase;
            return (
              <button 
                key={fase}
                onClick={() => setFiltroFase(fase)}
                className={`btn-filtro-fase ${isActive ? 'activo' : ''}`}
              >
                {fase}
              </button>
            );
          })}
        </div>
      </section>

      <section className="tabla-bitacora-contenedor bitacora-layer">
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
                <td className="celda-fecha">
                  {/* Fecha para escritorio (dd-mm-yyyy) */}
                  <span className="fecha-larga">{registro.fecha}</span>
                  {/* Fecha para móvil (dd-mm-yy) usando substring para saltar el "20" */}
                  <span className="fecha-corta">
                    {registro.fecha.substring(0, 6)}{registro.fecha.substring(8, 10)}
                  </span>
                </td>
                <td className="celda-avance">
                  {registro.claseBadge && (
                    <span className={`badge-fase ${registro.claseBadge}`}>{registro.fase}</span>
                  )}
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
          <p className="mensaje-vacio">No hay registros para esta fase.</p>
        )}
      </section>
    </main>
  );
}