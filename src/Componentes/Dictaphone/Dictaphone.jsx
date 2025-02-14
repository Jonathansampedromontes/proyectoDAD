import React, { useState, useEffect } from 'react';
import './dictaphone.css'

const Dictaphone = () => {
  const [transcript, setTranscript] = useState(''); // Transcripción en tiempo real
  const [listening, setListening] = useState(false); // Estado para saber si estamos escuchando
  const [isBrowserSupported, setIsBrowserSupported] = useState(true); // Verificar soporte del navegador
  const [finalText, setFinalText] = useState(''); // Texto final cuando se hace clic en "Enviar"
  let recognition;

  // Comprobar si el navegador soporta la Web Speech API
  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setIsBrowserSupported(false);
    } else {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = true; // Continuar escuchando
      recognition.interimResults = true; // Escuchar resultados intermedios mientras hablamos

      recognition.onstart = () => {
        setListening(true); // Cambiar el estado cuando comienza el reconocimiento
      };

      recognition.onresult = (event) => {
        let interimTranscript = ''; // Variable para guardar la transcripción intermedia
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart;
          } else {
            interimTranscript += transcriptPart; // Guardar la transcripción intermedia
          }
        }

        setTranscript(interimTranscript || finalTranscript); // Actualizar transcripción en tiempo real
      };

      recognition.onend = () => {
        setListening(false); // Cambiar el estado cuando el reconocimiento termina
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event); // Manejo de errores
      };
    }
  }, []);

  // Iniciar el reconocimiento de voz
  const startListening = () => {
    if (recognition) recognition.start();
  };

  // Detener el reconocimiento de voz
  const stopListening = () => {
    if (recognition) recognition.stop();
  };

  // Guardar el texto final cuando se presiona el botón de enviar
  const handleSubmit = () => {
    setFinalText(transcript); // Guarda el texto final en finalText
    setTranscript(''); // Limpia el estado de transcript para iniciar una nueva transcripción
  };

  if (!isBrowserSupported) {
    return <span>Tu navegador no soporta reconocimiento de voz.</span>;
  }

  return (
    <div>
      <p className="title-micro">Micrófono: {listening ? 'encendido' : 'apagado'}</p>
      <div className="micro-cont">
        {/* Campo de texto donde se transcribe en tiempo real */}
        <input type="text" value={transcript} placeholder="Hable ahora..." readOnly className="input-color"/>
        {/* Botón para hablar */}
        <button onMouseDown={startListening} onMouseUp={stopListening} onTouchStart={startListening} onTouchEnd={stopListening} className="micro" title="Mantén pulsado micro">
          <i class="bi bi-mic-fill"></i>
        </button>
      </div>
      <div>
          {/* Botón para enviar el texto final */}
          <button onClick={handleSubmit} className="envio">Enviar</button>
          {/* Muestra el texto final después de hacer clic en Enviar */}
          <p className="title-micro">{finalText}</p> 
      </div>
    </div>
  );
};

export default Dictaphone;
