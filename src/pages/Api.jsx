import { useState, useEffect } from 'react';
import { SpaceBackground } from '../components/SpaceBackground';
import '../styles/api.css';

export function Api() {
  const [personajes, setPersonajes] = useState([]);
  
  // Personaje al Azar
  const [personajeAzar, setPersonajeAzar] = useState(null);
  const [buscando, setBuscando] = useState(false);
  
  // Mini-Juego de Memoria
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [juegoIniciado, setJuegoIniciado] = useState(false); // Nuevo estado para iniciar el timer

useEffect(() => {
    // Lista de IDs con imágenes genéricas que queremos descartar
    const idsIgnorados = [18, 26, 28, 37, 38, 43, 47, 49, 50, 51, 55, 56, 57, 61, 64, 66, 71, 77, 79, 82, 83, 84];

    fetch('https://akabab.github.io/starwars-api/api/all.json')
      .then(res => res.json())
      .then(data => {
        // Filtramos: debe tener imagen Y su ID no debe estar en la lista negra
        const personajesValidos = data
          .filter(p => p.image && !idsIgnorados.includes(p.id))
          .slice(0, 40); // Tomamos un pool de 40 personajes limpios
          
        setPersonajes(personajesValidos);
        iniciarJuego(personajesValidos);
      })
      .catch(error => console.error("Error al cargar la API:", error));
  }, []);

  // Timer modificado: Solo arranca cuando 'juegoIniciado' es true (primer clic)
  useEffect(() => {
    let intervalo;
    if (juegoIniciado && isPlaying && !gameOver) {
      intervalo = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [juegoIniciado, isPlaying, gameOver]);

  const obtenerPersonajeAzar = () => {
    if (personajes.length > 0) {
      setBuscando(true);
      // Pequeño delay para dar feedback visual de búsqueda
      setTimeout(() => {
        const azar = personajes[Math.floor(Math.random() * personajes.length)];
        setPersonajeAzar(azar);
        setBuscando(false);
      }, 400);
    }
  };

  const iniciarJuego = (lista) => {
    const pool = lista || personajes;
    if (!pool || pool.length === 0) return;

    const barajados = [...pool].sort(() => 0.5 - Math.random());
    const seleccionados = barajados.slice(0, 6);
    
    const pares = [...seleccionados, ...seleccionados]
      .map((p, index) => ({ ...p, idUnico: `${p.id}-${index}` }))
      .sort(() => 0.5 - Math.random());
    
    setCards(pares);
    setFlipped([]);
    setMatched([]);
    setScore(0);
    setTime(0);
    setIsPlaying(true);
    setGameOver(false);
    setJuegoIniciado(false); // Reseteamos el inicio del timer
  };

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].id)) return;
    
    // Iniciar timer en el primer clic
    if (!juegoIniciado) setJuegoIniciado(true);
    
    const nuevosFlipped = [...flipped, index];
    setFlipped(nuevosFlipped);
    
    if (nuevosFlipped.length === 2) {
      const [primero, segundo] = nuevosFlipped;
      
      if (cards[primero].id === cards[segundo].id) {
        setMatched(prev => [...prev, cards[primero].id]);
        setScore(s => s + 5);
        setFlipped([]);
        
        if (matched.length + 1 === 6) {
          setGameOver(true);
          setIsPlaying(false);
        }
      } else {
        setScore(s => s - 2);
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  const formatearTiempo = (segundos) => {
    const m = Math.floor(segundos / 60).toString().padStart(2, '0');
    const s = (segundos % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <main className="contenedor-api">
      <SpaceBackground />
      
      <div className="api-layer">
        
        {/* --- SECCIÓN 1: TÍTULO Y DESCRIPCIÓN FUERA DEL RECUADRO --- */}
        <section className="api-header-global">
          <span className="etiqueta-mision">IDENTIFICACIÓN DE MISIÓN</span>
          <h1 className="titulo-api-principal">API Pública</h1>
          <p className="descripcion-api-principal">
            Consumo de datos externos para popular los registros de la Orden. Esta sección 
            utiliza datos reales obtenidos dinámicamente desde un repositorio público de Star Wars.
          </p>
          <a href="https://akabab.github.io/starwars-api/api/all.json" target="_blank" rel="noopener noreferrer" className="api-link-principal">
            https://github.com/akabab/starwars-api
          </a>
        </section>

        {/* --- SECCIÓN 2: RECUADRO DE DOCUMENTACIÓN --- */}
        <section className="api-info-box">
          <h3>Decisión Técnica: ¿Por qué no SWAPI?</h3>
          <p>
            Aunque <em>SWAPI (The Star Wars API)</em> es el estándar más conocido, carece de un elemento visual crucial para las interfaces modernas: <strong>imágenes</strong>. 
            Por esta razón, optamos por consumir el proyecto de código abierto alojado en <a href="https://github.com/akabab/starwars-api" target="_blank" rel="noopener noreferrer" className="link-inline">github.com/akabab/starwars-api</a>.
          </p>

          <h3 className="mt-4">Estructura del JSON</h3>
          <p>La API devuelve un array de objetos detallados. Las propiedades clave que nuestra aplicación intercepta y renderiza son:</p>
          <ul className="api-campos">
            <li><strong>id:</strong> Identificador numérico único de la base de datos.</li>
            <li><strong>name:</strong> Nombre oficial del personaje.</li>
            <li><strong>image:</strong> URL directa al archivo fotográfico en alta resolución.</li>
            <li><strong>species:</strong> Clasificación biológica.</li>
            <li><strong>gender:</strong> Género del individuo.</li>
            <li><strong>homeworld:</strong> Planeta de origen documentado.</li>
            <li><strong>height:</strong> Altura registrada en metros.</li>
          </ul>
        </section>

        <div className="linea-divisoria"></div>

        {/* --- SECCIÓN 3: PERSONAJE AL AZAR --- */}
        <section className="api-seccion-azar">
          <div className="azar-header">
            <h2>Holocron Aleatorio</h2>
            <p>Accede a un expediente clasificado al azar desde la base de datos externa.</p>
            <button className="btn-interactivo mt-2" onClick={obtenerPersonajeAzar} disabled={buscando}>
              {buscando ? 'Buscando...' : 'Conocer personaje al azar'}
            </button>
          </div>
          
          <div className="azar-contenedor-tarjeta">
            {!personajeAzar ? (
              <div className="tarjeta-vacia">
                <span className="icono-vacio">?</span>
                <p>Esperando para conocer al personaje...</p>
              </div>
            ) : (
              <article className="ficha-completa">
                <div className="ficha-img-wrapper">
                  <img src={personajeAzar.image} alt={personajeAzar.name} />
                </div>
                <div className="ficha-datos">
                  <span className="etiqueta-mision">PERSONAJE</span>
                  <h3 className="ficha-nombre">{personajeAzar.name}</h3>
                  
                  <div className="ficha-grid">
                    <div>
                      <small>Especie</small>
                      <p>{personajeAzar.species || 'Desconocida'}</p>
                    </div>
                    <div>
                      <small>Planeta de origen</small>
                      <p>{personajeAzar.homeworld || 'Desconocido'}</p>
                    </div>
                    <div>
                      <small>Género</small>
                      <p>{personajeAzar.gender || 'Desconocido'}</p>
                    </div>
                    <div>
                      <small>Altura</small>
                      <p>{personajeAzar.height ? `${personajeAzar.height} m` : 'Desconocida'}</p>
                    </div>
                  </div>
                  
                  <a href={personajeAzar.wiki} target="_blank" rel="noopener noreferrer" className="btn-ficha-completa">
                    Consultar ficha completa
                  </a>
                </div>
              </article>
            )}
          </div>
        </section>

        <div className="linea-divisoria"></div>

        {/* --- SECCIÓN 4: MINI JUEGO DE MEMORIA --- */}
        <section className="api-seccion-juego">
          <div className="juego-header">
            <h2>Entrenamiento de Memoria Jedi</h2>
            <p>Encuentra los pares, obtendrás 5 puntos por cada par encontrado pero si fallas, perderás 2 puntos. El tiempo iniciará al voltear la primera carta.</p>
          </div>

          <div className="juego-stats">
            <div className="stat-box">⏳ Tiempo: <span>{formatearTiempo(time)}</span></div>
            <div className="stat-box">🏆 Puntaje: <span>{score}</span></div>
            <button className="btn-interactivo btn-outline" onClick={() => iniciarJuego(personajes)}>
              Reiniciar Entrenamiento
            </button>
          </div>

          {gameOver && (
            <div className="juego-terminado">
              <h3>¡Simulación Completada!</h3>
              <p>Puntaje Final: <strong>{score}</strong></p>
              <p>Tiempo: <strong>{formatearTiempo(time)}</strong></p>
            </div>
          )}

          <div className="memoria-tablero">
            {cards.map((card, index) => {
              const estaVolteada = flipped.includes(index) || matched.includes(card.id);
              
              return (
                <div 
                  key={card.idUnico} 
                  className={`memoria-carta ${estaVolteada ? 'volteada' : ''}`}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="memoria-inner">
                    <div className="memoria-dorso">
                      <span className="logo-carta">YL</span>
                    </div>
                    <div className="memoria-frente">
                      <img src={card.image} alt={card.name} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
}