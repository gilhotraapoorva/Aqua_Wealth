// File: src/components/ChatbotWidget.tsx
"use client";

import React, { useState } from 'react';
import { askGemini } from '../services/geminiService';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const answer = await askGemini(userMessage.text);
      const botMessage: Message = { sender: 'bot', text: answer };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { sender: 'bot', text: 'Error: Unable to get a response.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-widget">
      {/* Chat Toggle Logo */}
      <img
        src="/chat-logo.svg"
        alt="Chat Logo"
        className="chat-toggle-logo"
        onClick={toggleChat}
      />

      {/* Chat Modal */}
      {isOpen && (
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <h3>Ask Gemini</h3>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
            {loading && <p className="loading">Loading...</p>}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
<style jsx>{`
  .chatbot-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }
  .chat-toggle-logo {
    width: 50px;
    height: 50px;
    cursor: pointer;
    border: none;
    background: transparent;
  }
  .chatbot-modal {
    width: 300px;
    max-height: 400px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    font-family: Arial, sans-serif;
  }
  .chatbot-header {
    padding: 10px;
    background: #0070f3;
    color: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    font-weight: bold;
  }
  .chatbot-messages {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    background-color: #f9f9f9;
  }
  .message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 6px;
    font-size: 14px;
    line-height: 1.5;
  }
  .message.user {
    background-color: #0070f3;
    color: white; /* ✅ White text for better contrast */
    text-align: right;
    border-radius: 12px 12px 0 12px;
  }
  .message.bot {
    background-color: #e5e5e5;
    color: #333; /* ✅ Darker text for better readability */
    text-align: left;
    border-radius: 12px 12px 12px 0;
  }
  .chatbot-input {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ccc;
    background-color: white;
  }
  .chatbot-input input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    color: #333; /* ✅ Darker text for better readability */
    background-color: #fff;
  }
  .chatbot-input input::placeholder {
    color: #888; /* ✅ Make placeholder more visible */
  }
  .chatbot-input button {
    margin-left: 10px;
    padding: 10px 14px;
    border: none;
    background-color: #0070f3;
    color: white;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s;
  }
  .chatbot-input button:hover {
    background-color: #005bb5;
  }
  .loading {
    font-style: italic;
    color: #666;
  }
`}</style>

    </div>
  );
};

export default ChatbotWidget;
