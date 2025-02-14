import React, { useContext } from "react";
import { LoginContext } from "../Login/LoginContext";  // Verifica que la ruta sea correcta
import './user.css'

export const UserU = () => {
  const { loginData } = useContext(LoginContext);

  // Asegúrate de que loginData esté definido
  if (!loginData || !loginData.userName) {
    return <h1>Dato vacío...</h1>;  // Muestra algo mientras se cargan los datos
  }

  console.log(loginData);  // Asegúrate de que los datos estén presentes en la consola

  return (
    <div>
      <h1 className="titulouser">Usuario</h1>
      <div className="cuadro">
        <h1 className="titleuser">{`Bienvenido "${loginData.userName}"`}</h1>
        <p className="usertext">{`Usuario: ${loginData.userName}`}</p> {/* Muestra el nombre de usuario */}
        <p className="usertext">{`Correo Electrónico: ${loginData.email}`}</p>
      </div>
    </div>
  );
};

export default UserU;