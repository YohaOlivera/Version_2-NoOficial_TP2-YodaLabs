import { useState } from 'react';
import { SpaceBackground } from '../components/SpaceBackground';
import { arbolComponentes } from '../data/arbol'; // IMPORTAMOS LA DATA
import '../styles/arbol.css';

// Componente Recursivo con Estilo IDE
const NodoArbol = ({ nodo, nivel = 0 }) => {
  const [abierto, setAbierto] = useState(nivel < 4); // Ajustado para que muestre más niveles abiertos al cargar
  const tieneHijos = nodo.hijos && nodo.hijos.length > 0;

  return (
    <li className="nodo-item">
      <div className="nodo-contenido">
        <div 
          className={`nodo-toggle ${tieneHijos ? 'visible' : 'oculto'}`}
          onClick={() => tieneHijos && setAbierto(!abierto)}
        >
          {abierto ? '[-]' : '[+]'}
        </div>
        
        <div className={`nodo-codigo tipo-${nodo.tipo}`}>
          {nodo.nombre}
        </div>
      </div>
      
      {(nodo.ruta || nodo.descripcion) && (
        <div className="nodo-info">
          {nodo.ruta && <div className="nodo-ruta">{nodo.ruta}</div>}
          {nodo.descripcion && <div className="nodo-descripcion">{nodo.descripcion}</div>}
        </div>
      )}
      
      {tieneHijos && abierto && (
        <ul className="nodo-rama">
          {nodo.hijos.map((hijo, index) => (
            <NodoArbol key={index} nodo={hijo} nivel={nivel + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

export function Arbol() {
  return (
    <main className="contenedor-arbol">
      <SpaceBackground />
      
      <div className="arbol-layer">
        <section className="arbol-header">
          <span className="etiqueta-mision">ARQUITECTURA DE SOFTWARE</span>
          <h1 className="titulo-arbol">Árbol de Componentes</h1>
          <p className="staff-descripcion">
            Estructura jerárquica de renderizado. Representa cómo React anida y compone la interfaz gráfica de la aplicación.
          </p>
        </section>

        <section className="arbol-visualizador">
          <div className="arbol-consola-header">
            <span className="punto rojo"></span>
            <span className="punto amarillo"></span>
            <span className="punto verde"></span>
            <span className="consola-titulo">react-devtools-tree.jsx</span>
          </div>
          
          <div className="arbol-consola-body">
            <ul className="arbol-raiz">
              {arbolComponentes.map((nodo, index) => (
                <NodoArbol key={index} nodo={nodo} />
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}