import React, { useState } from 'react';
import './Lista.css'

const Lista = ({ imagesData }) => {
  const itemsPerPage = 2; // Número de cuadros que se permite por página
  const [paginaActual, setCurrentPage] = useState(0); // Estado para la página actual
  const [searchQuery, setSearchQuery] = useState(''); // Estado para el texto de búsqueda

  const totalPaginas = Math.ceil(imagesData.length / itemsPerPage); // Total de páginas

  // Filtrar imágenes basadas en la búsqueda
  const filteredImages = imagesData.filter((image) =>
    image.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calcular el rango de elementos para la página actual
  const startIndex = paginaActual * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredImages.slice(startIndex, endIndex);

  // Para ir a la página siguiente
  const handleNext = () => {
    if (paginaActual < Math.ceil(filteredImages.length / itemsPerPage) - 1) {
      setCurrentPage(paginaActual + 1);
    }
  };

  // Para ir a la página anterior
  const handlePrevious = () => {
    if (paginaActual > 0) {
      setCurrentPage(paginaActual - 1);
    }
  };

  // Resetear la página actual si el filtro cambia
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reinicia la página actual al filtrar
  };

  return (
    <div className="contenedorLista">
      <h2>Lista de Imágenes</h2>

      {/* Barra de búsqueda */}
      <div className="barra-busqueda">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar por título..."
          className="input-busqueda"
        />
      </div>

      {/* Mostrar las imágenes y su título */}
      {filteredImages.length > 0 ? (
        <div className="image-list">
          {currentItems.map((image, index) => (
            <div className="image-item" key={startIndex + index}>
              <p className="titulos2">{`Grupo: ${image.title}`}</p>
              <div className="imageScreen">
                <img src={image.imageUrl} alt={`Imagen ${startIndex + index + 1}`} className="Image" title="Mantener Imagen"/>
                <img src={image.emojiUrl} alt="Emoji" className="emojimage" title="Mantener Emoji"/>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="titulos">No hay grupos en la lista...</p>
      )}

      {/* Botones de navegación */}
      {filteredImages.length > itemsPerPage && (
        <div className="navegaciones">
          <button className="buttonpage" onClick={handlePrevious} disabled={paginaActual === 0} title="Página Anterior">
            Anterior
          </button>
          <span className="numero-pagina">{paginaActual + 1}</span>
          <button className="buttonpage" onClick={handleNext} disabled={paginaActual === Math.ceil(filteredImages.length / itemsPerPage) - 1} title="Página Siguiente">
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default Lista;