import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { Perfil } from './pages/Perfil';
import { Bitacora } from './pages/Bitacora'; 
import { Recursos } from './pages/Recursos';
import { Api } from './pages/Api';
import { Arbol } from './pages/Arbol';
import './styles/style.css';
import './styles/perfiles.css';
import './styles/bitacora.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="contenido-principal">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/perfiles" element={<Navigate to="/#seccion-integrantes" />} />
            <Route path="/perfil/:id" element={<Perfil />} />
            <Route path="/bitacora" element={<Bitacora />} />
            <Route path="/recursos" element={<Recursos />} />
            <Route path="/api" element={<Api />} /> 
            <Route path="/arbol" element={<Arbol />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;