import { SpaceBackground } from '../components/SpaceBackground';
import { StaffCarousel } from '../components/StaffCarousel';

export function Home() {
  return (
    <div className="contenedor-index">
      {/* Nuestro nuevo canvas de React */}
      <SpaceBackground />

      {/* Hero: Primer pantalla completa */}
      <section className="seccion-hero seccion-completa" id="seccion-hero">
        <div className="hero-logo-wrapper revelable visible-scroll">
          <img src="/img/logo-yodalabs.png" alt="Yoda Labs" className="hero-logo-img" />
          <div className="hero-divisor"></div>
          <p className="hero-tagline">HAZ SCROLL PARA COMENZAR EL VIAJE</p>
        </div>
      </section>

      {/* Sección Sobre Nosotros: Segunda pantalla completa */}
      <section className="seccion-descripcion seccion-completa" id="texto-desc">
        <div className="contenedor-sobre-nosotros revelable visible-scroll">
          <div className="sobre-nosotros-imagen-wrapper">
            <img src="/img/Icon.png" alt="Yoda Labs Simbolo Galactico" className="sobre-nosotros-img" />
            <div className="sobre-nosotros-glow"></div>
          </div>
          <div className="sobre-nosotros-contenido">
            <span className="subtitulo-seccion-landing">IDENTIFICACIÓN // MISIÓN</span>
            <h2 className="titulo-sobre-nosotros">Sobre Nosotros</h2>
            <p>
              Desarrollando el futuro del entorno web. En Yoda Labs creemos que el verdadero dominio del código nace 
              del equilibrio: el lado luminoso del frontend, que da forma y vida a cada interfaz, y la fuerza del 
              backend, que sostiene todo desde las sombras. Codificamos soluciones limpias y funcionales, porque un 
              buen desarrollo no elige un lado: los conecta.
            </p>
          </div>
        </div>
      </section>

      {/* Staff */}
      <main id="seccion-integrantes" className="main-integrantes seccion-completa">
        <div className="contenedor-staff revelable visible-scroll">
          <div className="staff-encabezado">
            <h2 className="titulo-staff">Staff</h2>
            <p className="staff-descripcion">Seleccioná un holocrón para conocer a cada integrante de la tripulación.</p>
          </div>
          
          {/* Carrusel de integrantes */}
          <StaffCarousel />
          
        </div>
      </main>
      
      <footer className="footer-sitio">
        <p>Yoda Labs · TP2 · FrontEnd · IFTS N°29 · 2026</p>
      </footer>
    </div>
  );
}