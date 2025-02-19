import React, { useState } from "react";
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './ChatbotConfig'; // Asegúrate de que esta ruta sea correcta
import ActionProvider from './ChatbotActionProvider';
import MessageParser from './ChatbotMessageParser';

const ChatbotComponent = () => {
    const [showChatbot, setShowChatbot] = useState(false);
  return (
    
    <div style={chatbotStyle}>
          <button onClick={() => setShowChatbot(prevState => !prevState)} style={buttonStyle}>
              {showChatbot ? "Ocultar Chatbot" : "Mostrar Chatbot"}
          </button>
          {showChatbot &&  <Chatbot 
        config={config} 
        actionProvider={ActionProvider} 
        messageParser={MessageParser} 
      />}
    </div>
  );
};

const chatbotStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    maxWidth: '350px',
    width: '60%',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    backgroundColor: '#fff',
    overflow: 'hidden', 
    padding: '10px', 
    border: '1px solid #e0e0e0', 
};

const buttonStyle = {
    backgroundColor: '#007BFF', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontSize: '16px', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
    zIndex: 1001, // Aseguramos que el botón esté encima del chatbot
    transition: 'all 0.3s ease', 
  };
  
  // Agregar un efecto hover
  buttonStyle[':hover'] = {
    backgroundColor: '#0056b3', // Cambio de color cuando se pasa el mouse
    transform: 'scale(1.05)', // Aumentar ligeramente el tamaño al pasar el mouse
  };


export default ChatbotComponent;