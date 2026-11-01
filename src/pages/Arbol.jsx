import { useState } from 'react';
import { SpaceBackground } from '../components/SpaceBackground';

// Sub-componente recursivo para dibujar cada rama del árbol
const NodoArbol = ({ nombre, hijos, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const tieneHijos = hijos && hijos.length > 0;

  return (
    <div style={{ marginLeft: '20px', marginTop: '10px' }}>
      <div 
        onClick={() => tieneHijos && setIsOpen(!isOpen)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '0.6rem 1rem',
          backgroundColor: 'rgba(9, 13, 20, 0.8)',
          border: '1px solid var(--verde-fuerza)',
          borderRadius: '8px',
          cursor: tieneHijos ? 'pointer' : 'default',
          color: 'var(--verde-yoda)',
          fontFamily: 'var(--fuente-nav)',
          transition: 'all 0.3s ease',
          boxShadow: isOpen ? '0 0 10px rgba(57, 255, 122, 0.2)' : 'none'
        }}
      >
        {tieneHijos && (
          <span style={{ fontSize: '0.8rem', width: '15px' }}>
            {isOpen ? '▼' : '▶'}
          </span>
        )}
        {!tieneHijos && <span style={{ width: '15px' }}></span>}
        <span style={{ color: tieneHijos ? 'var(--verde-yoda)' : '#E2E8F0' }}>
          &lt;{nombre} /&gt;
        </span>
      </div>
      
      {/* Si está abierto y tiene hijos, renderizamos recursivamente */}
      {isOpen && tieneHijos && (
        <div style={{ borderLeft: '1px dashed var(--verde-sutil)', marginLeft: '14px', paddingLeft: '10px' }}>
          {hijos.map((hijo, index) => (
            <NodoArbol key={index} nombre={hijo.nombre} hijos={hijo.hijos} />
          ))}
        </div>
      )}
    </div>
  );
};

export function Arbol() {
  // Estructura real de nuestro proyecto Yoda Labs
  const estructuraApp = {
    nombre: 'App',
    hijos: [
      { nombre: 'Router' },
      { nombre: 'Sidebar' },
      {
        nombre: 'Routes',
        hijos: [
          {
            nombre: 'Home (Ruta: "/")',
            hijos: [
              { nombre: 'SpaceBackground' },
              { nombre: 'StaffCarousel' }
            ]
          },
          {
            nombre: 'Perfil (Ruta: "/perfil/:id")',
            hijos: [
              { nombre: 'SpaceBackground' }
            ]
          },
          {
            nombre: 'Bitacora (Ruta: "/bitacora")',
            hijos: [
              { nombre: 'SpaceBackground' }
            ]
          },
          {
            nombre: 'Recursos (Ruta: "/recursos")',
            hijos: [
              { nombre: 'SpaceBackground' }
            ]
          },
          {
            nombre: 'Api (Ruta: "/api")',
            hijos: [
              { nombre: 'SpaceBackground' }
            ]
          },
          {
            nombre: 'Arbol (Ruta: "/arbol")',
            hijos: [
              { nombre: 'SpaceBackground' },
              { nombre: 'NodoArbol (Recursivo)' }
            ]
          }
        ]
      }
    ]
  };

  return (
    <main className="contenedor-principal" style={{ minHeight: '100vh', padding: '6rem 2rem 2rem 2rem' }}>
      <SpaceBackground />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
        <h1 className="titulo-staff" style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Árbol de Componentes</h1>
        <p className="staff-descripcion" style={{ marginBottom: '2.5rem' }}>
          Estructura de renderizado interactiva de la aplicación React. Haz clic en los nodos para expandirlos o contraerlos.
        </p>

        <div style={{ 
          backgroundColor: 'rgba(5, 10, 18, 0.85)', 
          padding: '2rem', 
          borderRadius: '12px', 
          border: '1px solid var(--verde-fuerza)',
          backdropFilter: 'blur(8px)',
          overflowX: 'auto'
        }}>
          {/* Nodo Raíz */}
          <NodoArbol nombre={estructuraApp.nombre} hijos={estructuraApp.hijos} defaultOpen={true} />
        </div>
      </div>
    </main>
  );
}