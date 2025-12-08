import { useState } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Simple mock bot response - will be replaced with backend API call later
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! How can I help you today?";
    } else if (lowerMessage.includes("help")) {
      return "I'm here to assist you. What would you like to know?";
    } else if (lowerMessage.includes("thank")) {
      return "You're welcome! Is there anything else I can help with?";
    } else {
      return "Thanks for your message! I'm a simple chatbot. How can I assist you?";
    }
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = input.trim();

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    // Simulate bot typing delay
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(userMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full max-w-md h-[calc(100vh-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-6 py-4 shrink-0">
        <h1 className="text-2xl font-semibold text-gray-800">Chat Bot</h1>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-sm">Start a conversation...</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    B
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl shadow-sm ${
                    message.sender === "user"
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-sm"
                      : "bg-gray-50 text-gray-800 border border-gray-200 rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-end gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                  B
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            onClick={handleSend}
            className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
