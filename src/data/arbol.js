export const arbolComponentes = [
  {
    nombre: '<App />',
    ruta: 'src/App.jsx',
    descripcion: 'Raíz de la aplicación. Punto de entrada principal.',
    tipo: 'raiz',
    hijos: [
      {
        nombre: '<Router />',
        ruta: 'react-router-dom',
        descripcion: 'Habilita el enrutamiento sin recargar la página.',
        tipo: 'infraestructura',
        hijos: [
          {
            nombre: '<Sidebar />',
            ruta: 'src/components/Sidebar.jsx',
            descripcion: 'Menú lateral principal y navegación.',
            tipo: 'layout'
          },
          {
            nombre: '<Routes />',
            ruta: 'react-router-dom',
            descripcion: 'Contenedor que renderiza la página correspondiente a la URL.',
            tipo: 'infraestructura',
            hijos: [
              {
                nombre: '<Home />',
                ruta: 'src/pages/Home.jsx',
                descripcion: 'Portada principal del equipo Yoda Labs.',
                tipo: 'pagina',
                hijos: [
                  { nombre: '<SpaceBackground />', ruta: 'src/components/SpaceBackground.jsx', tipo: 'componente' },
                  { nombre: '<StaffCarousel />', ruta: 'src/components/StaffCarousel.jsx', descripcion: 'Carrusel interactivo.', tipo: 'componente' }
                ]
              },
              {
                nombre: '<Bitacora />',
                ruta: 'src/pages/Bitacora.jsx',
                descripcion: 'Registro de desarrollo.',
                tipo: 'pagina',
                hijos: [
                  { nombre: '<SpaceBackground />', ruta: 'src/components/SpaceBackground.jsx', tipo: 'componente' }
                ]
              },
              {
                nombre: '<Recursos />',
                ruta: 'src/pages/Recursos.jsx',
                descripcion: 'Armería Holocrón.',
                tipo: 'pagina',
                hijos: [
                  { nombre: '<SpaceBackground />', ruta: 'src/components/SpaceBackground.jsx', tipo: 'componente' }
                ]
              },
              {
                nombre: '<Api />',
                ruta: 'src/pages/Api.jsx',
                descripcion: 'Consumo de API externa y juego.',
                tipo: 'pagina',
                hijos: [
                  { nombre: '<SpaceBackground />', ruta: 'src/components/SpaceBackground.jsx', tipo: 'componente' }
                ]
              },
              {
                nombre: '<Perfil />',
                ruta: 'src/pages/Perfil.jsx',
                descripcion: 'Ficha individual dinámica.',
                tipo: 'pagina',
                hijos: [
                  { nombre: '<SpaceBackground />', ruta: 'src/components/SpaceBackground.jsx', tipo: 'componente' }
                ]
              },
              {
                nombre: '<Arbol />',
                ruta: 'src/pages/Arbol.jsx',
                descripcion: 'Visualizador de arquitectura.',
                tipo: 'pagina',
                hijos: [
                  { nombre: '<SpaceBackground />', ruta: 'src/components/SpaceBackground.jsx', tipo: 'componente' }
                ]
              }
            ]
          },
          {
            nombre: '<Footer />',
            ruta: 'src/components/Footer.jsx',
            descripcion: 'Pie de página global.',
            tipo: 'layout'
          }
        ]
      }
    ]
  }
];