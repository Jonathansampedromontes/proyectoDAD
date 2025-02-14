import { createChatBotMessage } from 'react-chatbot-kit';

const botName = "GeminisBot";

const config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(`¡Hola! Soy ${botName}, ¿en qué puedo ayudarte?`)
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
};

export default config;