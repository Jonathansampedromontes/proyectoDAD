import { useState } from "react";
import './input.css'

export function Input({ placeholder = "Introduce texto" }) {
    const [input, setInput] = useState(""); // Estado del input
    const [message, setMessage] = useState(""); // Estado del mensaje

    // Actualiza el nombre del mensaje
    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    // Envia el mensaje de bienvenida
    const handleButtonClick = (event) => {
        event.preventDefault(); // Evita que el botón provoque una recarga
        setMessage(<p className="bienvenida">`Bienvenido {input}`</p>);
    };

    return (
        <div>
            <h2>Input</h2>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
            <div>
                <button className="Button" type="button" onClick={handleButtonClick}>
                    Refrescar
                </button>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}