import React from "react";

const DarkMode = ({ darkMode, toggleDarkMode }) => {
  return (
    <div>
      <button onClick={toggleDarkMode} className="mode-button">
        {/* Cambia el ícono según el estado de darkMode */}
        {darkMode ? (
          <i className="fa-solid fa-moon" title="Ir a Claro"></i>
        ) : (
          <i className="fa-solid fa-sun" title="Ir a Oscuro"></i>
        )}
      </button>
    </div>
  );
};

export default DarkMode;