import React, {useState, useContext} from "react";
import { LoginContext } from "./LoginContext";
import './login.css'

const LoginUser = () => {
  // Usamos el useContext para obtener la función de actualización del contexto
  const { updateLoginData } = useContext(LoginContext);

  // Usamos useState para manejar los datos del formulario
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); 

    // Actualizamos los datos en el contexto
    updateLoginData(formData);

    // Mensaje que se ha creado los datos
    alert(`Usuario creado \nNombre: ${formData.userName}\nCorreo: ${formData.email}`);

    // Puedes agregar lógica adicional, como redirigir al usuario o mostrar un mensaje de éxito
    console.log('Datos enviados:', formData);
  };
  return (
    <div className="loginForm">
      <h1>Iniciar Sesión</h1>
      <form action="#" method="post" onSubmit={handleSubmit}>
        {/* Campo: Nombre */}
        <label htmlFor="userName">Nombre:</label>
        <input className="login" type="text" onChange={handleChange} name="userName" placeholder="Escribir Nombre" required />

        {/* Campo: Correo */}
        <label htmlFor="email">Correo:</label>
        <input className="login" type="email" onChange={handleChange} name="email" placeholder="Escribir Correo" required />

        {/* Campo: Contraseña */}
        <label htmlFor="password">Contraseña:</label>
        <input className="login" type="password"  onChange={handleChange} name="password" placeholder="Escribir Contraseña" required />

        {/* Botón de envío */}
        <button className="loginButton" type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default LoginUser;
