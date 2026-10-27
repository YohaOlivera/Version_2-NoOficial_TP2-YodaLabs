import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { staffData } from '../data/staff';

export function Sidebar() {
  const [isMobileHidden, setIsMobileHidden] = useState(false);
  // Inicializa en true para que siempre esté abierto en escritorio
  const [showPerfiles, setShowPerfiles] = useState(true);
  const location = useLocation();
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (window.innerWidth <= 900) {
      setIsMobileHidden(false);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsMobileHidden(true);
        setShowPerfiles(false); // Cierra los circulitos al ocultar la barra
      }, 4000); 
    }
  };

  useEffect(() => {
    resetTimer();
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    window.addEventListener('resize', resetTimer);
    
    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      window.removeEventListener('resize', resetTimer);
    };
  }, []);

  return (
    <>
      {isMobileHidden && (
        <button className="btn-expandir-movil" onClick={() => setIsMobileHidden(false)}>
          ▶
        </button>
      )}

      <aside 
        className={`sidebar-compartida ${isMobileHidden ? 'oculta' : ''}`}
        onMouseEnter={resetTimer}
        onClick={resetTimer}
      >
        {/* SECCIÓN 1: IMAGOTIPO */}
        <div className="sidebar-seccion">
          <NavLink to="/" className="logo-contenedor">
            <img src="/img/logo4.png" alt="Logo Yoda Labs" style={{ maxWidth: '100%', height: 'auto', maxHeight: '40px' }} />
          </NavLink>
        </div>

        <div className="sidebar-divisor"></div>

        {/* SECCIÓN 2: NAVEGACIÓN PRINCIPAL */}
        <nav className="sidebar-seccion">
          <NavLink to="/" className={({isActive}) => isActive && location.pathname === '/' ? "nav-link activo" : "nav-link"}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span className="texto-nav">Inicio</span>
          </NavLink>
          
          <NavLink to="/bitacora" className={({isActive}) => isActive ? "nav-link activo" : "nav-link"}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            <span className="texto-nav">Bitácora</span>
          </NavLink>

          <NavLink to="/recursos" className={({isActive}) => isActive ? "nav-link activo" : "nav-link"}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            <span className="texto-nav">Recursos</span>
          </NavLink>

          <NavLink to="/arbol" className={({isActive}) => isActive ? "nav-link activo" : "nav-link"}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
            <span className="texto-nav">Árbol de Componentes</span>
          </NavLink>

          <NavLink to="/api" className={({isActive}) => isActive ? "nav-link activo" : "nav-link"}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
            <span className="texto-nav">API Pública</span>
          </NavLink>
        </nav>

        <div className="sidebar-divisor"></div>

{/* SECCIÓN 3: PERFILES Y GITHUB */}
        <div className="sidebar-seccion">
          
          {/* Contenedor relativo para anclar el submenú en móvil */}
          <div style={{ position: 'relative' }}>
            <div 
              className={`nav-link ${location.pathname.includes('/perfil/') ? 'activo' : ''}`} 
              onClick={() => setShowPerfiles(!showPerfiles)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span className="texto-nav">Perfiles</span>
            </div>

            {showPerfiles && (
              <div className="perfiles-submenu">
                {staffData.map((miembro) => {
                  const isActivo = location.pathname === `/perfil/${miembro.id}`;
                  return (
                    <NavLink 
                      key={miembro.id} 
                      to={`/perfil/${miembro.id}`} 
                      className="nav-link-perfil nav-link"
                      style={{
                        backgroundColor: isActivo ? `${miembro.colorPrincipal}15` : 'transparent',
                        color: isActivo ? miembro.colorPrincipal : '#a0aec0',
                        boxShadow: isActivo ? `inset 3px 0 0 ${miembro.colorPrincipal}` : 'none'
                      }}
                    >
                      <span className="perfil-avatar-container">
                        <img 
                          src={miembro.avatar} 
                          alt={miembro.nombre} 
                          className="perfil-avatar" 
                          style={{ borderColor: isActivo ? miembro.colorPrincipal : 'transparent' }}
                        />
                      </span>
                      <div className="perfil-info">
                        <span className="perfil-nombre">{miembro.nombre}</span>
                        <span className="perfil-rol">{miembro.rol || 'Desarrollador'}</span>
                      </div>
                    </NavLink>
                  )
                })}
              </div>
            )}
          </div>

          <a href="https://github.com/LeonelDiaz225/Front-Trabajo_Practico_Grupal_1.git" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ marginTop: '0.5rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            <span className="texto-nav">GitHub</span>
          </a>
        </div>
      </aside>
    </>
  );
}