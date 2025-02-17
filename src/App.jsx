import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { LoginProvider } from "./Login/LoginContext";
import Fetch from './API/FetchA';
import Login from './Login/LoginUserU';
import UserU from './User/UsersU';
import Componentes from './Componentes/Componentesj';
import Informes from './Informes/Informes';
import Gestor from './Gestor/GestorT';
import DarkMode from './DarkModej';
import AlgoliaU from './Algolia/AlgoliaU';
import ChatbotComponent from './Chatbot/Chatbot';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './App.css';

function App() {
   // Estado para manejar el modo oscuro
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true"; // Recuperar el valor de localStorage
  });

  // Función para cambiar el estado de modo oscuro
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode); // Invertir el estado
  };

  useEffect(() => {
    // Guardar el estado de darkMode en localStorage
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.classList.add("darkmode"); // Aplicar clase darkmode al body
    } else {
      document.body.classList.remove("darkmode"); // Remover clase darkmode
    }
  }, [darkMode]);

  return (
    <LoginProvider>
    <Router>
      <div>
        {/* Barra de navegación */}
        <nav>
          <ul>
            <li>
              <p className="darkmod">Proyecto DAD Jonathan</p>
            </li>
              <li>
                <Link to="/Componentes">Componentes</Link>
              </li>
              <li>
                <Link to="/Fetch">API</Link>
              </li>
              <li>
                <Link to="/Gestor">Gestor de Tareas</Link>
              </li>
              <li>
                <Link to="/Informes">Informes</Link>
              </li>
              <li className="nav-icons">
                <AlgoliaU darkMode={darkMode}/>
                <DarkMode darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
                <Link to="/UserU"><i className="fas fa-user" title="Usuario"></i></Link>
                <Link to="/LoginUser"><i className="fas fa-door-open" title="Login"></i></Link>
              </li>
            </ul>
        </nav>

        {/* Rutas */}
        <Routes>
          <Route path="/" element={<Componentes />} />
          <Route path="/Fetch" element={<Fetch />} />
          <Route path="/Componentes" element={<Componentes />} />
          <Route path="/Gestor" element={<Gestor />} />
          <Route path="/Informes" element={<Informes darkMode={darkMode} />} />
          <Route path="/UserU" element={<UserU />} />
          <Route path="/LoginUser" element={<Login />} />
        </Routes>
      </div>
    </Router>

    <ChatbotComponent/>
    </LoginProvider>
  );
}

export default App;
