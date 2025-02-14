import React, { useState } from "react";
import './contador.css'

// Hace un contador de botones
export function Contador() {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1); // Incrementa el número
    const decrement = () => setCount(count - 1); // Disminuye el número
    const reset = () => setCount(0); // Resetea el número 

    return (
        <div> 
            <h3 className="tituloContador">Contador: {count}</h3>
            <div className="Botones">
            <button onClick={increment}>+1</button>
            <button onClick={reset}>Reset</button>
            <button onClick={decrement}>-1</button>
            </div>
        </div>
    );
}