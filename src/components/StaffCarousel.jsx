import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export function StaffCarousel() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let currentX = 0;
    let isPaused = false;
    let animationFrameId;
    const speed = 1.2;

    const animarCarrusel = () => {
      if (!isPaused) {
        currentX -= speed;
        const firstCard = track.firstElementChild;
        const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
        const cardWidth = firstCard.offsetWidth + gap;

        if (Math.abs(currentX) >= cardWidth) {
          track.appendChild(firstCard);
          currentX += cardWidth;
        }
        track.style.transform = `translateX(${currentX}px)`;
      }
      animationFrameId = requestAnimationFrame(animarCarrusel);
    };

    animarCarrusel();

    const handleMouseEnter = () => isPaused = true;
    const handleMouseLeave = () => isPaused = false;

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      track.removeEventListener('mouseenter', handleMouseEnter);
      track.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const integrantes = [
    { id: 'leonel', nombre: 'Leonel', rol: 'Arquitectura & Git Lead', afinidad: 'JEDI GUARDIAN', sistema: 'SANTA FE', color: '#4da3ff', avatar: '/img/yoda2.jpg', code: 'YL-01 // JEDI', portfolio: 'https://repo-front-phi.vercel.app/' },
    { id: 'maximiliano', nombre: 'Max', rol: 'Ingeniería & Core Frontend', afinidad: 'JEDI SENTINEL', sistema: 'BUENOS AIRES', color: '#ff9900', avatar: '/img/yoda10.jpg', code: 'YL-02 // SENTINEL', portfolio: 'https://mmillan.vercel.app/' },
    { id: 'yohana', nombre: 'Yohana', rol: 'Estructura & Semántica', afinidad: 'FORCE ADEPT', sistema: 'TUCUMÁN', color: '#ff66b2', avatar: '/img/yoda7.jpg', code: 'YL-03 // MYSTIC', portfolio: 'https://yohaolivera.github.io/pfo-portfolio-yohana/' },
    { id: 'melisa', nombre: 'Melisa', rol: 'Contenidos & QA Interface', afinidad: 'KYBER STRIKER', sistema: 'BUENOS AIRES', color: '#e63c3c', avatar: '/img/yoda6.jpg', code: 'YL-04 // KYBER', portfolio: 'https://portfolio-melisa.vercel.app/' },
    { id: 'itziar', nombre: 'Itziar', rol: 'Desarrollo, Diseño & UX', afinidad: 'JEDI CONSULAR', sistema: 'BUENOS AIRES', color: '#b266ff', avatar: '/img/yoda1.jpg', code: 'YL-05 // MASTER', portfolio: 'https://pfo-1-portfolio-itziar-urriola.vercel.app/' }
  ];

  return (
    <div className="carousel-viewport">
      <div className="carousel-fade-left"></div>
      <div className="carousel-fade-right"></div>
      
      <section className="grilla-integrantes" ref={trackRef} id="carousel-track" style={{ display: 'flex', gap: '1.8rem', width: 'max-content' }}>
        {integrantes.map((int) => (
          <article key={int.id} className="tarjeta-resumen card-visible" style={{ '--card-color': int.color }}>
            <div className="card-scanline"></div>
            <div className="card-badge-header">
              <span className="card-id-code">{int.code}</span>
              <span className="card-status-dot"></span>
            </div>
            
            <div className="card-cuerpo">
              <div className="avatar-marco">
                <img src={int.avatar} alt={`Avatar ${int.nombre}`} className="avatar-index" />
                <span className="avatar-aura"></span>
              </div>
              <div className="card-info">
                <h2>{int.nombre}</h2>
                <p className="rol-texto">{int.rol}</p>
                <div className="card-telemetria">
                  <span className="telemetria-item"><span>AFINIDAD:</span> {int.afinidad}</span>
                  <span className="telemetria-item"><span>SISTEMA:</span> {int.sistema}</span>
                </div>
              </div>
            </div>
            
            <div className="card-botones">
              {/* Navegación interna con React Router */}
              <Link to={`/perfil/${int.id}`} className="btn-perfil">
                <span className="btn-texto">Holocrón</span>
                <span className="btn-flecha">►</span>
              </Link>
              <a href={int.portfolio} target="_blank" rel="noopener noreferrer" className="btn-perfil btn-portfolio">
                <span className="btn-texto">Portfolio</span>
                <span className="btn-flecha">↗</span>
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}