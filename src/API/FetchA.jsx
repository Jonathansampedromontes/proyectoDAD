import React, { useState } from 'react';
import './fetch.css'
import Lista from './Lista/Lista';

const FetchImage = () => {
  const [imageUrl, setImageUrl] = useState('');  // Estado para almacenar la URL de la imagen
  const [emojiUrl, setEmojiUrl] = useState(''); // Estado para almacenar la URL del emoji
  const [showInput, setShowInput] = useState(false); // Estado para mostrar el input
  const [title, setTitle] = useState(''); // Estado para almacenar el título
  const [imagesData, setImagesData] = useState([]); // Lista para almacenar imágenes con título y emoji

  // Función para obtener una nueva imagen aleatoria
  const fetchImage = () => {
    const newImageUrl = `https://picsum.photos/200?random=${Math.random()}`; // Genera una URL con un número aleatorio
    setImageUrl(newImageUrl);  // Actualiza el estado con la nueva URL de la imagen
  };

  // Lista de URLs de emojis 
  const emojiUrls = [
    'https://em-content.zobj.net/thumbs/240/apple/354/grinning-face_1f600.png',
    'https://em-content.zobj.net/thumbs/240/apple/354/face-with-tears-of-joy_1f602.png',
    'https://em-content.zobj.net/thumbs/240/apple/354/smiling-face-with-sunglasses_1f60e.png',
    'https://em-content.zobj.net/thumbs/240/apple/354/smiling-face-with-heart-eyes_1f60d.png',
    'https://em-content.zobj.net/thumbs/240/apple/354/thinking-face_1f914.png',
  ];

  // Selecciona un emoji aleatorio al hacer clic en la imagen
  const handleImageClick = () => {
    const randomEmoji = emojiUrls[Math.floor(Math.random() * emojiUrls.length)]; // Selecciona un emoji aleatorio
    setEmojiUrl(randomEmoji); // Actualiza el estado con el emoji seleccionado
    setShowInput(true); // Muestra el input
  };

  // Para entregar a la lista
  const handleSubmit = () => {
    const newImageData = {
      imageUrl,
      emojiUrl,
      title,
    };

    setImagesData([...imagesData, newImageData]);

    setShowInput(false);
    setTitle('');
    setImageUrl('');
    setEmojiUrl('');
  };

  //Aquí e modificado también 
  
  return (
    <div>
      <h1 className='Title1'>Imagen Aleatoria</h1>
      
      {/* Botón para obtener una nueva imagen */}
      <div>
        <button onClick={fetchImage}>Meter Imagen</button>
      </div>
      <div className="imagenAleatoria">
          {/* Mostrar la imagen solo si la URL está definida */}
          {imageUrl && <img src={imageUrl} onClick={handleImageClick} className='image' alt="Imagen aleatoria" title="Pulsar Imagen" />}

          {/* Mostrar el emoji solo si la URL está definida */}
          {emojiUrl && <img src={emojiUrl} className='emoji' alt="emoji aleatorio" title="Mantener emoji" />}
      </div>

       {/* Mostrar el input para escribir el título si está activado */}
       {showInput && (
        <div>
          <label htmlFor="userName">Poner Título:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="tituloTexto" placeholder="Escribe un título..."/>
          <button onClick={handleSubmit}>Enviar</button>
        </div>
        )}

        <Lista imagesData={imagesData} />
    </div>
  );
};

export default FetchImage;