import axios from 'axios';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  async handleUserMessage(userMessage) {
    try {
      // Enviar el mensaje al servidor para que se procese con Gemini
      const response = await axios.post("http://localhost:5000/api/geminis", { message: userMessage });

      // Obtener la respuesta del bot (la cual es generada por Gemini)
      const botResponse = response.data.reply;

      // Crear un mensaje del bot con la respuesta de Gemini
      const botMessage = this.createChatBotMessage(botResponse);

      // Actualizar el estado con el nuevo mensaje del bot
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      const errorMessage = this.createChatBotMessage(
        "Lo siento, no puedo responder en este momento."
      );

      // Si ocurre un error, mostrar un mensaje de error
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  }
}

export default ActionProvider;