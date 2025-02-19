import React, { useState, useRef, useEffect } from "react";
import './cats.css'


// Custom hook para obtener la imagen del gato
const useCat = () => {
    const [url, setUrl] = useState(null);
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    
    const hasFetched = useRef(false); // Se utiliza para evitar que se haga la petición varias veces

    useEffect(() => {
        if (hasFetched.current) return; // Evitar doble solicitud
        hasFetched.current = true; // Marcar como completado

        fetch("https://api.thecatapi.com/v1/images/search")
            .then((response) => response.json())
            .then((data) => {
                const imageUrl = data[0]?.url;
                const imageWidth = data[0]?.width;
                const imageHeight = data[0]?.height;

                setUrl(imageUrl);
                setWidth(imageWidth);
                setHeight(imageHeight);
            })
            .catch((error) => {
                console.error("Error fetching the cat image:", error);
            });
    }, []);

    // Si no se ha cargado la imagen, podemos mostrar un texto de carga
    if (!url) {
        return <p>Cargando imagen del gato...</p>;
    }

    return <img src={url} width={width} height={height} alt="Gato" className="Cat"/>;
};

// Custom hook para obtener la cita
const useQuote = () => {
    const [quote, setQuote] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return; // Evitar doble solicitud
        hasFetched.current = true; // Marcar como completado

        fetch("https://dummyjson.com/quotes/random")
            .then((response) => response.json())
            .then((data) => {
                setQuote(data.quote);
            })
            .catch((error) => {
                console.error("Error fetching the quote:", error);
            });
    }, []);

    // Si la cita aún no está disponible, mostramos un texto de carga
    if (!quote) {
        return <p className="texto">Cargando cita...</p>;
    }

    return quote;
};

// Componente Cats que usa los hooks useCat y useQuote
const Cats = () => {
    const cat = useCat(); // Obtiene la imagen del gato
    const quote = useQuote(); // Obtiene la cita

    return (
        <div>
            <h2>Gatos y frases aleatorias</h2>
            {cat}
            <p className="texto">{quote}</p>
        </div>
    );
};

export default Cats;

