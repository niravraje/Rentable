import * as React from "react";
import Chatbot from "react-chatbot-kit";
import "../style/chatBot.css";
import ActionProvider from "../components/ChatBot/ActionProvider";
import MessageParser from "../components/ChatBot/MessageParser";
import Config from "../components/ChatBot/config";
const ChatBotPage = () => {
  return (
    <div className="App" style={{ paddingLeft: "40%", paddingTop: "5%" }}>
      <div style={{ maxWidth: "300px" }}>
        <Chatbot
          config={Config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </div>
    </div>
  );
};

export default ChatBotPage;
