import { Link } from 'react-router-dom';
import { SpaceBackground } from '../components/SpaceBackground';
import { StaffCarousel } from '../components/StaffCarousel';

export function Home() {
  return (
    <div className="contenedor-index">
      <SpaceBackground />

      {/* HERO */}
      <section className="seccion-hero seccion-completa" id="seccion-hero" style={{ 
        display: 'flex', flexDirection: 'column', justifyContent: 'center', 
        alignItems: 'center', textAlign: 'center', padding: '0 2rem', position: 'relative' 
      }}>
        <div className="hero-contenido revelable visible-scroll" style={{ maxWidth: '850px', zIndex: 1 }}>
          <div className="hero-logo-glow" style={{ marginBottom: '1.5rem' }}>
            <img src="/img/logo-yodalabs.png" alt="Yoda Labs" style={{ maxWidth: '500px', filter: 'drop-shadow(0 0 15px rgba(57,255,122,0.3))'}} />
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--texto-claro)', 
            fontFamily: 'var(--fuente-titulos)', marginBottom: '1.2rem', lineHeight: '1.1' 
          }}>
            Dominamos la <span style={{ color: 'var(--verde-yoda)', textShadow: '0 0 20px rgba(57,255,122,0.4)' }}>Fuerza</span> del Código
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#a0aec0', 
            marginBottom: '2.5rem', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 2.5rem auto' 
          }}>
            Somos un escuadrón de desarrolladores fusionando el lado luminoso del frontend con la arquitectura profunda del backend para crear experiencias web inmersivas.
          </p>
          
          <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/arbol" style={{ 
              padding: '0.8rem 2.2rem', backgroundColor: 'var(--verde-yoda)', color: '#050a12', 
              textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', 
              fontFamily: 'var(--fuente-nav)', transition: 'all 0.3s', boxShadow: '0 0 15px rgba(57,255,122,0.3)' 
            }}>
              Explorar Arquitectura
            </Link>
            <a href="#seccion-integrantes" style={{ 
              padding: '0.8rem 2.2rem', backgroundColor: 'rgba(9, 13, 20, 0.8)', color: 'var(--verde-yoda)', 
              textDecoration: 'none', border: '1px solid var(--verde-yoda)', borderRadius: '8px', 
              fontWeight: 'bold', fontFamily: 'var(--fuente-nav)', transition: 'all 0.3s' 
            }}>
              Conocer al Staff
            </a>
          </div>
        </div>
        
        {/* Indicador de scroll animado */}
        <div style={{ position: 'absolute', bottom: '2.5rem', animation: 'palpitar 2s infinite', zIndex: 1 }}>
          <p style={{ color: 'var(--verde-yoda)', fontSize: '0.75rem', letterSpacing: '2px', margin: '0 0 0.5rem 0' }}>DESCENDER</p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--verde-yoda)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto', display: 'block' }}>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      </section>

      {/* SECCIÓN SOBRE NOSOTROS */}
      <section className="seccion-descripcion seccion-completa" id="texto-desc" style={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'center', 
        textAlign: 'center', padding: '4rem 2rem', position: 'relative' 
      }}>
        <div className="revelable visible-scroll" style={{ maxWidth: '800px', margin: '0 auto', zIndex: 1 }}>
          <span style={{ 
            color: 'var(--verde-yoda)', letterSpacing: '4px', fontSize: '0.85rem', 
            display: 'block', marginBottom: '1rem', fontWeight: 'bold' 
          }}>
            IDENTIFICACIÓN // MISIÓN
          </span>
          
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--texto-claro)', 
            marginBottom: '2rem', fontFamily: 'var(--fuente-especial)' 
          }}>
            Sobre Nosotros
          </h2>
          
          <p style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#a0aec0', 
            lineHeight: '1.8', textShadow: '0 2px 4px rgba(0,0,0,0.8)' 
          }}>
            Desarrollando el futuro del entorno web. En Yoda Labs creemos que el verdadero dominio del código nace 
            del equilibrio: el lado luminoso del frontend, que da forma y vida a cada interfaz, y la fuerza del 
            backend, que sostiene todo desde las sombras. Codificamos soluciones limpias y funcionales, porque un 
            buen desarrollo no elige un lado: los conecta.
          </p>
        </div>
      </section>

      {/* STAFF CARRUSEL */}
      <main id="seccion-integrantes" className="main-integrantes seccion-completa">
        <div className="contenedor-staff revelable visible-scroll">
          <div className="staff-encabezado">
            <h2 className="titulo-staff">Staff</h2>
            <p className="staff-descripcion">Seleccioná un holocrón para conocer a cada integrante de la tripulación.</p>
          </div>
          <StaffCarousel />
        </div>
      </main>
      
      <footer className="footer-sitio">
        <p>Yoda Labs · TP2 · FrontEnd · IFTS N°29 · 2026</p>
      </footer>
    </div>
  );
}