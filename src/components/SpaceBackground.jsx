import { useEffect, useRef } from 'react';

export function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const ajustarTamanio = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', ajustarTamanio);
    ajustarTamanio();

    const estrellas = [];
    const CANTIDAD_ESTRELLAS = 220;
    let velocidadActual = 6;
    let velocidadObjetivo = 6;
    const VELOCIDAD_BASE = 6;
    const VELOCIDAD_MAXIMA = 33;

    class Estrella {
      constructor() {
        this.resetear(true);
      }
      resetear(inicial = false) {
        this.x = (Math.random() - 0.5) * canvas.width * 2;
        this.y = (Math.random() - 0.5) * canvas.height * 2;
        this.z = inicial ? Math.random() * canvas.width : canvas.width;
        this.prevZ = this.z;
        this.radioBase = Math.random() * 1.6 + 0.8;
        const tonos = ['#FFFFFF', '#E0F2FE', '#BAE6FD', '#67E8F9', '#39FF7A', '#1DB954', '#A7F3D0'];
        this.color = tonos[Math.floor(Math.random() * tonos.length)];
      }
      actualizar() {
        this.prevZ = this.z;
        this.z -= velocidadActual;
        if (this.z <= 0) {
          this.resetear();
        }
      }
      dibujar() {
        const k = canvas.width / this.z;
        const posX = this.x * k + canvas.width / 2;
        const posY = this.y * k + canvas.height / 2;

        if (posX < -50 || posX > canvas.width + 50 || posY < -50 || posY > canvas.height + 50) {
          return;
        }

        if (velocidadActual > 10) {
          const prevK = canvas.width / Math.max(this.prevZ, 1);
          const prevPosX = this.x * prevK + canvas.width / 2;
          const prevPosY = this.y * prevK + canvas.height / 2;

          ctx.beginPath();
          ctx.moveTo(prevPosX, prevPosY);
          ctx.lineTo(posX, posY);
          
          const anchoLinea = Math.min((this.radioBase * k) * 0.8, 3.5);
          ctx.lineWidth = anchoLinea;
          ctx.strokeStyle = this.color;
          ctx.lineCap = 'round';
          ctx.stroke();
        } else {
          const radioProyectado = Math.min(this.radioBase * k, 4.5);
          ctx.beginPath();
          ctx.arc(posX, posY, radioProyectado, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      }
    }

    for (let i = 0; i < CANTIDAD_ESTRELLAS; i++) {
      estrellas.push(new Estrella());
    }

    const actualizarVelocidad = () => {
      const factorInercia = 0.08;
      velocidadActual += (velocidadObjetivo - velocidadActual) * factorInercia;
    };

    const animarEspacio = () => {
      actualizarVelocidad();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < estrellas.length; i++) {
        estrellas[i].actualizar();
        estrellas[i].dibujar();
      }
      animationFrameId = requestAnimationFrame(animarEspacio);
    };

    animarEspacio();

    const calcularVelocidadPorScroll = () => {
      const scrollMaximo = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const scrollActual = window.scrollY || document.documentElement.scrollTop || 0;
      const factorProgreso = Math.min(Math.max(scrollActual / scrollMaximo, 0), 1);
      velocidadObjetivo = VELOCIDAD_BASE + (VELOCIDAD_MAXIMA - VELOCIDAD_BASE) * Math.pow(factorProgreso, 1.2);
    };

    window.addEventListener('scroll', calcularVelocidadPorScroll, { passive: true });
    calcularVelocidadPorScroll();

    // Limpieza al desmontar el componente
    return () => {
      window.removeEventListener('resize', ajustarTamanio);
      window.removeEventListener('scroll', calcularVelocidadPorScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      id="espacio-canvas" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.95
      }} 
    />
  );
}