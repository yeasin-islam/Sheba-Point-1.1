import { useState, useEffect, useRef } from "react";
import { X, Send, MessageSquareText, Clock, Check, CheckCheck } from "lucide-react";

export default function DoctorChatBox({ doctor, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Sample initial messages
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: `Hello! This is Dr. ${doctor.name.split(" ")[1]}. How can I help you today?`,
        sender: "doctor",
        time: new Date(),
        status: 'read'
      },
      {
        id: 2,
        text: "You can ask me about your health concerns or book an appointment.",
        sender: "doctor",
        time: new Date(),
        status: 'read'
      }
    ]);
  }, [doctor.name]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      time: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate doctor typing indicator
    setTimeout(() => {
      setIsTyping(false);
      // Simulate doctor's reply after 1-3 seconds
      const replies = [
        "I understand your concern. Let me check that for you.",
        "Thanks for your message. I'll get back to you shortly.",
        "That's a good question. The recommended approach would be...",
        "I recommend scheduling an appointment to discuss this further.",
        "Based on your symptoms, I suggest..."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      const doctorReply = {
        id: Date.now() + 1,
        text: randomReply,
        sender: "doctor",
        time: new Date(),
        status: 'read'
      };
      setMessages(prev => [...prev, doctorReply]);
    }, 1000 + Math.random() * 2000);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Only auto-scroll if user hasn't manually scrolled up
    const container = chatContainerRef.current;
    if (container) {
      const isNearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      if (isNearBottom) {
        scrollToBottom();
      }
    }
  }, [messages]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Group messages by date
  const groupedMessages = messages.reduce((acc, message) => {
    const dateKey = formatDate(message.time);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(message);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-0">
      {/* Overlay with fade-in animation */}
      <div 
        className="fixed inset-0  bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Chat Container with slide-up animation */}
      <div className="relative w-full max-w-md rounded-t-lg bg-base-100 shadow-xl transition-all duration-300 transform sm:rounded-lg sm:scale-100">
        {/* Chat Header with gradient background */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-secondary text-primary-content">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary-content ring-offset-base-100 ring-offset-2">
                <img src={doctor.profileImage} alt={doctor.name} />
              </div>
            </div>
            <div>
              <h3 className="font-medium">{doctor.name}</h3>
              <div className="flex items-center gap-1">
                <div className={`h-2 w-2 rounded-full ${isTyping ? 'bg-warning' : 'bg-success'}`}></div>
                <p className="text-xs">
                  {isTyping ? 'Typing...' : 'Online'}
                </p>
              </div>
            </div>
          </div>
          <button 
            className="btn btn-ghost btn-sm btn-circle text-primary-content hover:bg-primary-focus"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Area with custom scrollbar */}
        <div 
          ref={chatContainerRef}
          className="h-96 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-base-100"
        >
          {Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date} className="mb-4">
              <div className="sticky top-0 z-10 mb-3">
                <div className="mx-auto w-fit rounded-full bg-base-200 px-3 py-1 text-xs">
                  {date}
                </div>
              </div>
              
              {dateMessages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs rounded-2xl p-3 relative ${message.sender === "user" 
                      ? "bg-primary text-primary-content rounded-br-none" 
                      : "bg-base-200 rounded-bl-none"}`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-xs opacity-70">
                        {formatTime(message.time)}
                      </span>
                      {message.sender === "user" && (
                        <span className="text-xs">
                          {message.status === 'sent' ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <CheckCheck className="h-3 w-3 text-info" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex mb-3">
              <div className="bg-base-200 rounded-2xl rounded-bl-none px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input with send button */}
        <div className="border-t p-3 bg-base-100">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="input input-bordered flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className={`btn btn-primary rounded-full ${!newMessage.trim() ? 'opacity-50' : ''}`}
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}