import React, { useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import './AlgoliaU.css';


const searchClient = algoliasearch('ZHJVVJ8373', '94b4851a4a908c8826fff349638c0c81');

const AlgoliaU = ({ darkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsPopupOpen(false);
    } else {
      fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
          const filteredResults = products.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchResults(filteredResults);
          setIsPopupOpen(true);
        });
    }
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Componente para renderizar un producto
  const ProductItem = ({ product }) => (
    <div className={`product-item ${darkMode ? 'darkmode' : ''}`}>
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h4>{product.title}</h4>
        <p>{product.description}</p>
        <p className="product-price">${product.price}</p>
      </div>
    </div>
  );

  return (
    <div className={`algolia-search-container ${darkMode ? 'darkmode' : ''}`}>
      {/* Barra de búsqueda */}
      <InstantSearch searchClient={searchClient} indexName="movies_index">
      <SearchBox
            onChange={handleSearchInputChange}
            translations={{ placeholder: 'Buscar productos...' }}
          />
      </InstantSearch>

      {/* Popup con los resultados */}
      {isPopupOpen && searchResults.length > 0 && (
            <div className={`search-popup ${darkMode ? 'darkmode' : ''}`}>
              {searchResults.map(product => (
                <ProductItem key={product.id} product={product} />
              ))}
        </div>
      )}

      {/* Mensaje si no hay resultados */}
      {isPopupOpen && searchResults.length === 0 && (
        <div className="search-popup">
          <p>No se encontraron productos.</p>
        </div>
      )}
    </div>
  );
};

export default AlgoliaU;