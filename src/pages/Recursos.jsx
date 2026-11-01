import { useState } from 'react';
import recursosData from '../data/recursos.json';
import { SpaceBackground } from '../components/SpaceBackground';
import '../styles/recursos.css';

export function Recursos() {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [dropdownAbierto, setDropdownAbierto] = useState(false);

  // Obtener categorías únicas dinámicamente
  const categoriasUnicas = ['Todas', ...new Set(recursosData.map(r => r.categoria))];

  // Aplicar filtros cruzados (texto + selector)
  const recursosFiltrados = recursosData.filter(recurso => {
    const coincideTexto = recurso.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                          recurso.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCat = categoria === 'Todas' || recurso.categoria === categoria;
    return coincideTexto && coincideCat;
  });

  const restablecerFiltros = () => {
    setBusqueda('');
    setCategoria('Todas');
    setDropdownAbierto(false);
  };

  return (
    <main className="contenedor-recursos">
      <SpaceBackground />
      
      <div className="recursos-layer">
        <h1 className="titulo-staff titulo-recursos">Armería Holocrón</h1>
        <p className="descripcion-recursos">
          Explora la base de datos de herramientas, librerías y tecnologías utilizadas por Yoda Labs.
        </p>

        {/* Controles de Búsqueda y Filtro */}
        <div className="filtros-recursos">
          <input 
            type="text" 
            placeholder="Buscar tecnología..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-busqueda"
          />

          {/* Menú desplegable */}
          <div className="custom-select-container">
            <div 
              className={`custom-select-trigger ${dropdownAbierto ? 'abierto' : ''}`}
              onClick={() => setDropdownAbierto(!dropdownAbierto)}
            >
              {categoria}
              <span className="custom-arrow"></span>
            </div>
            
            {dropdownAbierto && (
              <ul className="custom-select-options">
                {categoriasUnicas.map(cat => (
                  <li 
                    key={cat}
                    className={categoria === cat ? 'seleccionado' : ''}
                    onClick={() => {
                      setCategoria(cat);
                      setDropdownAbierto(false); // Cierra al elegir
                    }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button onClick={restablecerFiltros} className="btn-limpiar">
            Limpiar Filtros
          </button>
        </div>

        {/* Mensaje de Sin Resultados */}
        {recursosFiltrados.length === 0 && (
          <div className="alerta-vacia">
            <h3>Datos no encontrados</h3>
            <p>No existen registros que coincidan con los parámetros actuales en los archivos Jedi.</p>
          </div>
        )}

        {/* Grilla de Resultados */}
        <div className="grilla-recursos">
          {recursosFiltrados.map(recurso => {
            const requiereInvertir = recurso.nombre === 'GitHub' || recurso.nombre === 'Express';
            
            return (
              <article key={recurso.id} className="tarjeta-recurso">
                <div className="tarjeta-recurso-header">
                  <span className="recurso-categoria">{recurso.categoria.toUpperCase()}</span>
                  <span className="recurso-nivel">{recurso.nivel}</span>
                </div>
                
                <div className="recurso-titulo-container">
                  <img 
                    src={recurso.icono} 
                    alt={`Logo ${recurso.nombre}`} 
                    className={`recurso-icono ${requiereInvertir ? 'icono-invertido' : ''}`} 
                  />
                  <h3 className="recurso-nombre">{recurso.nombre}</h3>
                </div>
                
                <p className="recurso-descripcion">{recurso.descripcion}</p>
              </article>
            );
          })}
        </div>

      </div>
    </main>
  );
}