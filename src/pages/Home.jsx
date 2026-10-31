import { Link } from 'react-router-dom';
import { SpaceBackground } from '../components/SpaceBackground';
import { StaffCarousel } from '../components/StaffCarousel';

export function Home() {
  return (
    <div className="contenedor-index">
      <SpaceBackground />

      {/* HERO */}
      <section className="seccion-hero seccion-completa" id="seccion-hero">
        <div className="hero-contenido revelable visible-scroll">
          <div className="hero-logo-glow">
            <img src="/img/logo-yodalabs.png" alt="Yoda Labs" className="hero-logo-img" />
          </div>
          
          <h1 className="hero-titulo">
            Dominamos la <span>Fuerza</span> del Código
          </h1>
          
          <p className="hero-bajada">
            Somos un escuadrón de desarrolladores fusionando el lado luminoso del frontend con la arquitectura profunda del backend para crear experiencias web inmersivas.
          </p>
          
          <div className="hero-botones">
            <Link to="/arbol" className="btn-hero btn-primario">
              Explorar Arquitectura
            </Link>
            <a href="#seccion-integrantes" className="btn-hero btn-secundario">
              Conocer al Staff
            </a>
          </div>
        </div>
        
        {/* Indicador de scroll animado */}
        <div className="indicador-scroll">
          <p>DESCENDER</p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--verde-yoda)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      </section>

      {/* SECCIÓN SOBRE NOSOTROS */}
      <section className="seccion-descripcion seccion-completa" id="texto-desc">
        <div className="contenedor-descripcion revelable visible-scroll">
          <span className="etiqueta-mision">
            IDENTIFICACIÓN // MISIÓN
          </span>
          
          <h2 className="titulo-descripcion">
            Sobre Nosotros
          </h2>
          
          <p className="texto-descripcion">
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
      
    </div>
  );
}