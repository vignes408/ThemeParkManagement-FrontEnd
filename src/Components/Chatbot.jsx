import React, { useState } from 'react';
import '../Components/Chatbot.css';

const responses = {
  greeting: "Hello! How can I assist you with your Ticket Booking?",
  bookTicket: "You can book a Ticket by selecting the 'Book Now button' option.",
  checkPrice: "The prices are vary for each ticket type for regular ticket it will be Rs.950 and for fast track ticket it will be Rs.1250 and for College Id Ticket Rs.600",
  help: "If you need any help, feel free to ask!",
  parkTiming: "Weekdays the timing will be 11AM to 5PM and During the weekend and holidays it will be from 10AM to 6PM",
  default: "I'm sorry, I didn't understand that. Can you please rephrase?"
};

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSend = () => {
    const userMessage = input.trim();
    if (userMessage) {
      setMessages(prevMessages => [...prevMessages, { type: 'user', text: userMessage }]);
      handleResponse(userMessage);
      setInput('');
    }
  };

  const handleResponse = (message) => {
    let response = responses.default;

    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('good morning') || message.toLowerCase().includes('good afternoon')) {
      response = responses.greeting;
    } else if (message.toLowerCase().includes('book') || message.toLowerCase().includes('Tickets')) {
      response = responses.bookTicket;
    } else if (message.toLowerCase().includes('price') || message.toLowerCase().includes('Ticket price')) {
      response = responses.checkPrice;
    } else if(message.toLowerCase().includes('Park timings') || message.toLowerCase().includes('timings') || message.toLowerCase().includes('timing')){
        response = responses.parkTiming;
    }else if (message.toLowerCase().includes('help')) {
      response = responses.help;
    }

    setMessages(prevMessages => [...prevMessages, { type: 'bot', text: response }]);
  };

  return (
    <div>
      {/* Chatbot Toggle Button */}
      <button 
        className="chatbot-toggle-button" 
        onClick={() => setIsVisible(!isVisible)}
      >
        Chat <i class="fa fa-comments" aria-hidden="true"></i>
      </button>

      {/* Chatbot Popup */}
      {isVisible && (
        <div className="chatbot">
          <div className="chat-window">
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
