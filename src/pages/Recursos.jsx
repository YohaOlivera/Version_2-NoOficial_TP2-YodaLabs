import { useState } from 'react';
import recursosData from '../data/recursos.json';
import { SpaceBackground } from '../components/SpaceBackground';

export function Recursos() {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');

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
  };

  return (
    <main className="contenedor-principal" style={{ minHeight: '100vh', padding: '6rem 2rem 2rem 2rem' }}>
      <SpaceBackground />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto' }}>
        <h1 className="titulo-staff" style={{ fontSize: '2.2rem', marginBottom: '2rem' }}>Armería Holocrón</h1>
        <p className="staff-descripcion" style={{ marginBottom: '2.5rem' }}>
          Explora la base de datos de herramientas, librerías y tecnologías utilizadas por Yoda Labs.
        </p>

        {/* Controles de Búsqueda y Filtro */}
        <div style={{ 
          display: 'flex', gap: '1rem', flexWrap: 'wrap', 
          backgroundColor: 'rgba(9, 13, 20, 0.8)', padding: '1.5rem', 
          borderRadius: '12px', border: '1px solid var(--verde-fuerza)', marginBottom: '2rem' 
        }}>
          
          <input 
            type="text" 
            placeholder="Buscar tecnología..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ 
              flex: '1', minWidth: '200px', padding: '0.8rem', borderRadius: '6px',
              backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid #4a5568',
              outline: 'none', fontFamily: 'var(--fuente-texto)'
            }}
          />

          <select 
            value={categoria} 
            onChange={(e) => setCategoria(e.target.value)}
            style={{ 
              padding: '0.8rem', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.05)', 
              color: '#fff', border: '1px solid #4a5568', outline: 'none', fontFamily: 'var(--fuente-texto)',
              cursor: 'pointer'
            }}
          >
            {categoriasUnicas.map(cat => (
              <option key={cat} value={cat} style={{ color: '#000' }}>{cat}</option>
            ))}
          </select>

          <button 
            onClick={restablecerFiltros}
            style={{ 
              padding: '0.8rem 1.5rem', backgroundColor: 'transparent', color: 'var(--verde-yoda)',
              border: '1px solid var(--verde-yoda)', borderRadius: '6px', cursor: 'pointer',
              fontFamily: 'var(--fuente-nav)'
            }}
          >
            Limpiar Filtros
          </button>
        </div>

        {/* Mensaje de Sin Resultados (Nivel Propone) */}
        {recursosFiltrados.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: '12px', border: '1px solid #ff4444' }}>
            <h3 style={{ color: '#ff4444', marginBottom: '1rem' }}>Datos no encontrados</h3>
            <p style={{ color: '#e2e8f0' }}>No existen registros que coincidan con los parámetros actuales en los archivos Jedi.</p>
          </div>
        )}

        {/* Grilla de Resultados */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {recursosFiltrados.map(recurso => (
            <article key={recurso.id} style={{ 
              backgroundColor: 'rgba(13, 34, 51, 0.6)', border: '1px solid var(--verde-sutil)', 
              borderRadius: '10px', padding: '1.5rem', backdropFilter: 'blur(5px)',
              transition: 'transform 0.2s', cursor: 'default'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--verde-yoda)', fontSize: '0.8rem', fontFamily: 'var(--fuente-nav)' }}>[{recurso.categoria.toUpperCase()}]</span>
                <span style={{ backgroundColor: 'rgba(57, 255, 122, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', color: '#1DB954' }}>{recurso.nivel}</span>
              </div>
              
              {/* Contenedor del Título y el Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.8rem' }}>
                <img src={recurso.icono} alt={`Logo ${recurso.nombre}`} style={{ width: '35px', height: '35px', objectFit: 'contain', filter: 'drop-shadow(0px 0px 5px rgba(255,255,255,0.2))' }} />
                <h3 style={{ fontSize: '1.4rem', margin: 0, fontFamily: 'var(--fuente-titulos)', color: 'var(--texto-claro)' }}>{recurso.nombre}</h3>
              </div>
              
              <p style={{ color: '#a0aec0', fontSize: '0.9rem', lineHeight: '1.5' }}>{recurso.descripcion}</p>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}