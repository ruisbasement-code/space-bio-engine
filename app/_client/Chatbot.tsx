'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
    { text: "Hello! How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const worker = useRef<Worker | null>(null);

  useEffect(() => {
    if (!worker.current) {
      console.log("Creating chatbot worker...");
      worker.current = new Worker(new URL('./chatbot.worker.ts', import.meta.url), {
        type: 'module'
      });

      worker.current.onmessage = (event) => {
        console.log("Received message from worker:", event.data);
        const aiResponse = event.data;
        if (aiResponse.status === "ready") {
          setMessages(prev => [...prev, { text: "Model ready! You can now ask questions.", sender: 'bot' }]);
        } else {
          setMessages(prev => [...prev, { text: aiResponse.result, sender: 'bot' }]);
        }
      };

      console.log("Sending download message to worker...");
      worker.current.postMessage({
        action: 'download',
        // modelURL: 'Felladrin/onnx-Pythia-31M-Chat-v1',
        // modelURL: 'Felladrin/onnx-TinyMistral-248M-Chat-v2',
        modelURL: 'Xenova/Qwen1.5-0.5B-Chat', 
      });
    }

    return () => {
      if (worker.current) {
        worker.current.terminate();
        worker.current = null;
      }
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() && worker.current) {
      const userMessage = { text: inputValue, sender: 'user' as const };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      console.log("Sending chat message to worker:", inputValue);
      worker.current.postMessage({
        action: 'chat',
        content: inputValue,
      });
      
      setInputValue('');
    }
  };

  if (!isOpen) {
    return (
      <button onClick={toggleChat} style={styles.chatButton}>
        Need Help? 
      </button>
    );
  }

  return (
    <div style={styles.chatWindow}>
      <div style={styles.chatHeader}>
        <h2>AI Professor</h2>
        <Image src="/bot-avatar.png" alt="Bot Avatar" width={40} height={40} style={styles.avatar} />
        <button onClick={toggleChat} style={styles.closeButton}>X</button>
      </div>
      <div style={styles.chatMessages}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.chatInputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          style={styles.chatInput}
          placeholder="Ask a question..."
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  chatButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    zIndex: 1000,
  },
  chatWindow: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '350px',
    height: '500px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,
    color: '#333',
  },
  chatHeader: {
    padding: '10px',
    backgroundColor: '#f1f1f1',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    gap: '10px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
  chatMessages: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '10px',
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
    padding: '8px 12px',
    borderRadius: '10px',
    maxWidth: '80%',
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
  },
  chatInputContainer: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ddd',
  },
  chatInput: {
    flex: 1,
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  sendButton: {
    marginLeft: '10px',
    padding: '8px 12px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};

export default Chatbot;