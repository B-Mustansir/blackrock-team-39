import React, { useState } from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import Chatbot from "../Chatbot/Chatbot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

const MainDash = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      <Table />

      <Chatbot isOpen={isChatbotOpen} onClose={toggleChatbot} />

      <div className="chatbot-icon" onClick={toggleChatbot}>
        <FontAwesomeIcon icon={faCommentDots} size="2x" />
      </div>
    </div>
  );
};

export default MainDash;
