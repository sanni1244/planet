import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user's message to the chat
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      // Send message to Wit.ai API (GET request)
      const response = await axios.get(
        `https://api.wit.ai/message`,
        {
          params: { q: input },
          headers: {
            Authorization: "Bearer YWKBWTAPBEMBBVBG3SUWOVMZGBD7Q53E", 

          },
        }
      );

      // Check if Wit.ai recognized any entities or intents
      const entities = response.data.entities;
      let botReply = "Sorry, I didn't understand that.";

      // Simple example of response based on entities or keyword matching
      if (entities["greeting"]) {
        botReply = "Hello! How can I assist you today?";
      } else if (entities["help"]) {
        botReply = "Sure! How can I help you?";
      } else if (input.toLowerCase().includes("bye")) {
        botReply = "Goodbye! Have a great day!";
      }

      // Add bot's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botReply },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>AI Chatbot</h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
          height: "300px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "bot" ? "left" : "right",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
                background: msg.sender === "bot" ? "#e1e1e1" : "#4caf50",
                color: msg.sender === "bot" ? "#000" : "#fff",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message..."
        style={{
          width: "calc(100% - 90px)",
          padding: "10px",
          marginRight: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button onClick={handleSend} style={{ padding: "10px", borderRadius: "5px" }}>
        Send
      </button>
    </div>
  );
};

export default Chatbot;
