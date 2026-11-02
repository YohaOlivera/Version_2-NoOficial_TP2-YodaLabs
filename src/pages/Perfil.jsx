import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { staffData } from '../data/staff';
import { SpaceBackground } from '../components/SpaceBackground';

export function Perfil() {
  const { id } = useParams();
  const [isFlipped, setIsFlipped] = useState(false);

  // Buscar el integrante en base a la URL
  const currentIndex = staffData.findIndex(miembro => miembro.id === id);

  // Si el ID de la URL no existe, redirigimos al inicio
  if (currentIndex === -1) {
    return <Navigate to="/" />;
  }

  const perfil = staffData[currentIndex];

  // Lógica para la navegación circular (Anterior / Siguiente)
  const prevIndex = currentIndex === 0 ? staffData.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === staffData.length - 1 ? 0 : currentIndex + 1;
  const prevPerfil = staffData[prevIndex];
  const nextPerfil = staffData[nextIndex];

  // Restablecer el efecto flip cuando se cambia de perfil
  useEffect(() => {
    setIsFlipped(false);
  }, [id]);

  // Aplicamos las variables CSS dinámicamente según el color del integrante
  const cardStyle = {
    '--verde-yoda': perfil.colorPrincipal,
    '--verde-fuerza': perfil.colorSecundario
  };

  return (
    <main className="contenedor-principal" style={{ minHeight: '100vh' }}>
      <SpaceBackground />
      
      {/* CABECERA DEL PERFIL */}
      <section className="perfil-header">
        <span className="etiqueta-mision">EXPEDIENTE CLASIFICADO</span>
        <h1 className="titulo-perfil-header">Archivo Jedi</h1>
        <p className="staff-descripcion">
          Conoce el registro detallado, afinidad en la Fuerza y stack tecnológico del tripulante seleccionado de Yoda Labs.
        </p>
      </section>

      <section 
        className={`tarjeta-flip ${isFlipped ? 'girada' : ''}`} 
        id="tarjeta-perfil" 
        style={cardStyle}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        
        <div className="tarjeta-inner">
          
          {/* LADO FRONTAL */}
          <div className="tarjeta-frente">
            <div className="columna-izq">
              <img src={perfil.avatar} alt={`Avatar ${perfil.nombre}`} className="img-perfil" />
              <p className="click-hint">¡Más sobre mí!</p>
            </div>
            <div className="columna-der">
              <h1 className="nombre-perfil">{perfil.nombre}</h1>
              <p className="datos-personales">{perfil.datosPersonales}</p>
              
              <div className="tecnologias">
                <img src="/img/icono-html5.png" alt="HTML5" className="icono-tech" />
                <img src="/img/icono-css3.png" alt="CSS3" className="icono-tech" />
                <img src="/img/icono-js.png" alt="JavaScript" className="icono-tech" />
                <img src="/img/icono-python.png" alt="Python" className="icono-tech" />
                <img src="/img/icono-csharp.png" alt="C#" className="icono-tech" />
                <img src="/img/github-blanco.png" alt="GitHub" className="icono-tech" />
              </div>

              <div className="cualidades">
                <h3>Cualidades y Habilidades</h3>
                <ul>
                  {perfil.cualidades.map((cualidad, index) => (
                    <li key={index}>{cualidad}</li>
                  ))}
                </ul>
              </div>

              {/* Prevent default para que el click en el botón no gire la tarjeta */}
              <a 
                href={perfil.portfolio} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-portfolio-perfil"
                onClick={(e) => e.stopPropagation()} 
              >
                <span>Ver Portfolio</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* LADO TRASERO */}
          <div className="tarjeta-dorso">
            <div className="columna-izq">
              <img src={perfil.avatarDorso} alt={`Dorso ${perfil.nombre}`} className="img-perfil" />
            </div>
            <div className="columna-der">
              <h1 className="nombre-perfil">{perfil.nombre}</h1>
              <p className="datos-personales">{perfil.datosPersonales}</p>
              
              <div className="favoritos">
                <h3>Películas Favoritas</h3>
                <div className="galeria-peliculas">
                  {perfil.peliculas.map((peli, index) => (
                    <a key={index} href={peli.url} target="_blank" rel="noopener noreferrer" className="peli-item" onClick={(e) => e.stopPropagation()}>
                      <img src={peli.img} alt={peli.titulo} title={peli.titulo} />
                    </a>
                  ))}
                </div>

                <h3>Discos Favoritos</h3>
                <div className="galeria-discos">
                  {perfil.discos.map((disco, index) => (
                    <a key={index} href={disco.url} target="_blank" rel="noopener noreferrer" className="disco-item" onClick={(e) => e.stopPropagation()}>
                      <img src={disco.img} alt={disco.titulo} title={disco.titulo} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* NAVEGACIÓN CIRCULAR (ANTERIOR / SIGUIENTE) */}
      <nav className="navegacion-tripulacion" style={{ position: 'relative', zIndex: 10 }}>
        <Link to={`/perfil/${prevPerfil.id}`} className="btn-tripulacion btn-tripulacion-anterior">
          <span aria-hidden="true">◄</span>
          <span><small>ANTERIOR</small>{prevPerfil.nombre.split(' ')[0]}</span>
        </Link>
        
        <Link to="/perfiles" className="indicador-tripulacion">
          YL · 0{currentIndex + 1} / 05
        </Link>
        
        <Link to={`/perfil/${nextPerfil.id}`} className="btn-tripulacion btn-tripulacion-siguiente">
          <span><small>SIGUIENTE</small>{nextPerfil.nombre.split(' ')[0]}</span>
          <span aria-hidden="true">►</span>
        </Link>
      </nav>
    </main>
  );
}