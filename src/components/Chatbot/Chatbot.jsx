import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() !== "") {
      const newMessages = [...messages, { text: input, sender: "user" }];
      setMessages(newMessages);
      setInput("");

      try {
        // Replace 'YOUR_API_URL' with your actual API endpoint
        const response = await fetch("YOUR_API_URL", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        });

        const data = await response.json();

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.response, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error: Unable to fetch response", sender: "bot" },
        ]);
      }
    }
  };

  return (
    <div className={`chatbot ${isOpen ? "active" : ""}`}>
      <div className="chatbot-header">
        <span className="chatbot-title">Chatbot</span>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${msg.sender}`}
            dangerouslySetInnerHTML={{ __html: msg.text }}
          />
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend} >Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
