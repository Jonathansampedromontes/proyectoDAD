import { createContext, useState } from "react";

// Crear el contexto
export const LoginContext = createContext();

// Crear el proveedor del contexto
export const LoginProvider = ({ children }) => {
  const [loginData, setLoginData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  // Función para actualizar los datos del login
  const updateLoginData = (data) => {
    setLoginData(data);
  };

  return (
    <LoginContext.Provider value={{ loginData, updateLoginData }}>
      {children}
    </LoginContext.Provider>
  );
};