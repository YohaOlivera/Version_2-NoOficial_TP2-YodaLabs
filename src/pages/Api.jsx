import { useState, useEffect } from 'react';
import { SpaceBackground } from '../components/SpaceBackground';

export function Api() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para consumir la API de Star Wars (SWAPI)
  const fetchStarWarsData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Usamos un número aleatorio de página para que el botón "Actualizar" traiga datos distintos
      const randomPage = Math.floor(Math.random() * 9) + 1; 
      const response = await fetch(`https://swapi.dev/api/people/?page=${randomPage}`);
      
      if (!response.ok) {
        throw new Error('Error al conectar con los archivos Jedi (API)');
      }
      
      const data = await response.json();
      setPersonajes(data.results.slice(0, 6)); // Tomamos solo 6 para que se vea bien en la grilla
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta al montar el componente
  useEffect(() => {
    fetchStarWarsData();
  }, []);

  return (
    <main className="contenedor-principal" style={{ minHeight: '100vh', padding: '6rem 2rem 2rem 2rem' }}>
      <SpaceBackground />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto' }}>
        <h1 className="titulo-staff" style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Base de Datos SWAPI</h1>
        <p className="staff-descripcion" style={{ marginBottom: '2.5rem' }}>
          Información en vivo consumida desde la API pública The Star Wars API.
        </p>

        {/* Botón de Actualizar / Reintentar (Criterio 12 - Propone) */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button 
            onClick={fetchStarWarsData}
            disabled={loading}
            style={{
              padding: '0.8rem 1.5rem',
              backgroundColor: 'rgba(9, 13, 20, 0.8)',
              color: 'var(--verde-yoda)',
              border: '1px solid var(--verde-yoda)',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--fuente-nav)',
              opacity: loading ? 0.6 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? 'Sincronizando...' : '↻ Actualizar Datos'}
          </button>
        </div>

        {/* Estado 1: CARGANDO */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--verde-yoda)' }}>
            <div className="card-status-dot" style={{ display: 'inline-block', width: '20px', height: '20px', marginBottom: '1rem' }}></div>
            <h3 style={{ fontFamily: 'var(--fuente-nav)' }}>Estableciendo conexión con la Fuerza...</h3>
          </div>
        )}

        {/* Estado 2: ERROR */}
        {error && !loading && (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: '12px', border: '1px solid #ff4444' }}>
            <h3 style={{ color: '#ff4444', marginBottom: '1rem' }}>Fallo en la transmisión</h3>
            <p style={{ color: '#e2e8f0' }}>{error}</p>
          </div>
        )}

        {/* Estado 3: ÉXITO (Muestra de datos) */}
        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {personajes.map((personaje, index) => (
              <article key={index} style={{
                background: 'linear-gradient(135deg, rgba(9, 13, 20, 0.9), rgba(5, 10, 18, 0.9))',
                border: '1px solid var(--verde-fuerza)',
                borderRadius: '10px',
                padding: '1.5rem',
                backdropFilter: 'blur(5px)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                
                {/* Avatar Holográfico generado con CSS */}
                <div style={{
                  width: '70px', height: '70px', borderRadius: '50%',
                  backgroundColor: 'rgba(57, 255, 122, 0.05)',
                  border: '2px solid var(--verde-yoda)',
                  boxShadow: '0 0 15px rgba(57, 255, 122, 0.2), inset 0 0 10px rgba(57, 255, 122, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', fontFamily: 'var(--fuente-especial)', color: 'var(--verde-yoda)',
                  marginBottom: '1rem'
                }}>
                  {personaje.name.charAt(0)}
                </div>

                <h3 style={{ color: 'var(--texto-claro)', fontSize: '1.3rem', marginBottom: '1rem', borderBottom: '1px solid rgba(29, 185, 84, 0.3)', paddingBottom: '0.5rem', fontFamily: 'var(--fuente-especial)', width: '100%' }}>
                  {personaje.name}
                </h3>
                
                <ul style={{ listStyle: 'none', color: '#a0aec0', fontSize: '0.95rem', lineHeight: '1.8', width: '100%' }}>
                  <li><strong style={{ color: 'var(--verde-yoda)' }}>Año nac.:</strong> {personaje.birth_year}</li>
                  <li><strong style={{ color: 'var(--verde-yoda)' }}>Altura:</strong> {personaje.height} cm</li>
                  <li><strong style={{ color: 'var(--verde-yoda)' }}>Peso:</strong> {personaje.mass} kg</li>
                </ul>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}