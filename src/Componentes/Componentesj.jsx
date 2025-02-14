import React, { useState } from "react";
import { Contador } from "./contador/Contador";
import { Input } from "./input/InputB";
import Dictaphone  from "./Dictaphone/Dictaphone";
import Cats  from "./gatos/Cats";
import './componentes.css'

export function Componentes() {
    const [showCounter1, setShowCounter1] = useState(false);
    const [showCounter2, setShowCounter2] = useState(false);
    const [showCounter3, setShowCounter3] = useState(false);
    const [showCounter4, setShowCounter4] = useState(false);

    return (
        <div>
            <h1>Componentes</h1>
            <div className="Tamano-Botones">
                {/* Botón 1 */}
                <div className="BotonContador">
                    <button onClick={() => setShowCounter1(prevState => !prevState)}>
                        {showCounter1 ? "Ocultar Contador" : "Mostrar Contador"}
                    </button>
                    {showCounter1 && <Contador />}
                </div>

                {/* Botón 2 */}
                <div className="BotonContador">
                    <button onClick={() => setShowCounter2(prevState => !prevState)}>
                        {showCounter2 ? "Ocultar Input" : "Mostrar Input"}
                    </button>
                    {showCounter2 && <Input />}
                </div>

                {/* Botón 3 */}
                <div className="BotonContador">
                    <button onClick={() => setShowCounter3(prevState => !prevState)}>
                        {showCounter3 ? "Ocultar Gatos" : "Mostrar Gatos"}
                    </button>
                    {showCounter3 && <Cats />}
                </div>

                 {/* Botón 4 */}
                 <div className="BotonContador">
                    <button onClick={() => setShowCounter4(prevState => !prevState)}>
                        {showCounter4 ? "Ocultar Micrófono" : "Mostrar Micrófono"}
                    </button>
                    {showCounter4 && <Dictaphone />}
                </div>
            </div>
        </div>
    );
}

export default Componentes;

