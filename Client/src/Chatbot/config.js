import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import LearningOptions from "./LearningOptions/LearningOptions";
import LinkList from "./LinkList/LinkList";

const config = {
  botName: "LearningBot",
  initialMessages: [
    createChatBotMessage("Hi, I'm here to help. What do you want to learn?", {
      widget: "learningOptions",
    }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#007fff",
    },
    chatButton: {
      backgroundColor: "#fd3a69",
    },
  },
  widgets: [
    {
      widgetName: "learningOptions",
      widgetFunc: (props) => <LearningOptions {...props} />,
    },
    {
      widgetName: "javascriptLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Introduction to JS",
            url:
              "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
            id: 1,
          },
          {
            text: "Mozilla JS Guide",
            url:
              "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
            id: 2,
          },
          {
            text: "Frontend Masters",
            url: "https://frontendmasters.com",
            id: 3,
          },
        ],
      },
    },
    {
      widgetName: "testTopics",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Topic 1",
            id: 1,
          },
          {
            text: "Topic 2",
            id: 2,
          },
          {
            text: "Topic 3",
            id: 3,
          }
        ],
      },
        
    },
    {
      widgetName: "timeTable",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Subject1 - Date1",
            id: 1,
          },
          {
            text: "Subject2 - Date2",
            id: 2,
          },
          {
            text: "Subject3 - Date3",
            id: 3,
          }
        ],
      },  
    }
    
  ],
};

export default config;
