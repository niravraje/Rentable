// Config starter code
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./options/Options"


const config = {
  botName:"Rentable Bot",
  initialMessages: [createChatBotMessage(`Hello, what do you need help with?`,{
      widget: "options",
    }),
  ],
  widgets: [
      {
          widgetName: "options",
          widgetFunc: (props) => <Options {...props}/>,
      },
      {
          widgetName: "car",
          widgetFunc: (props) => <Options {...props}/>,
      },
      {
          widgetName: "apartment",
          widgetFunc: (props) => <Options {...props}/>,
      },
      {
          widgetName: "service",
          widgetFunc: (props) => <Options {...props}/>,
      }
  ]
}

export default config