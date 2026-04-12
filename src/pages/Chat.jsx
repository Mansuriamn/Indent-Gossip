"use client"

import { useState, useRef, useEffect } from "react"
import "./Chat.css"

// Mock data for chats
const MOCK_CHATS = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/images/avatar-1.png",
      online: true,
    },
    lastMessage: "Hey, how's it going?",
    timestamp: "2m ago",
    unread: 2,
  },
  {
    id: 2,
    user: {
      name: "Sam Wilson",
      username: "samw",
      avatar: "/images/avatar-2.png",
      online: false,
    },
    lastMessage: "Did you see the new movie?",
    timestamp: "1h ago",
    unread: 0,
  },
  {
    id: 3,
    user: {
      name: "Jamie Smith",
      username: "jamies",
      avatar: "/images/avatar-3.png",
      online: true,
    },
    lastMessage: "Let's meet up tomorrow!",
    timestamp: "3h ago",
    unread: 0,
  },
]

// Mock data for messages
const MOCK_MESSAGES = [
  {
    id: 1,
    sender: "other",
    content: "Hey, how's it going?",
    timestamp: "10:30 AM",
    read: true,
  },
  {
    id: 2,
    sender: "me",
    content: "Not bad! Just working on a new project. How about you?",
    timestamp: "10:32 AM",
    read: true,
  },
  {
    id: 3,
    sender: "other",
    content: "I'm good too. Just wanted to check in. Are you free this weekend?",
    timestamp: "10:33 AM",
    read: true,
  },
  {
    id: 4,
    sender: "me",
    content: "Yes, I should be free on Saturday afternoon. What did you have in mind?",
    timestamp: "10:35 AM",
    read: true,
  },
  {
    id: 5,
    sender: "other",
    content: "Great! There's a new cafe downtown I wanted to check out. How does that sound?",
    timestamp: "10:36 AM",
    read: false,
  },
]

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [chats, setChats] = useState(MOCK_CHATS);
  const [activeTab, setActiveTab] = useState('private');
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'me',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const selectChat = (chatId) => {
    setActiveChat(chatId);
    
    // Mark messages as read
    setChats(chats.map(chat => 
      chat.id === chatId ? { ...chat, unread: 0 } : chat
    ));
  };
  
  return (
    <div className="chat-page">
      <div className="container">
        <div className="chat-header">
          <h1>Chat</h1>
          
          <div className="chat-tabs">
            <button 
              className={`tab-btn ${activeTab === 'private' ? 'active' : ''}`}
              onClick={() => setActiveTab('private')}
            >
              Private
            </button>
            <button 
              className={`tab-btn ${activeTab === 'public' ? 'active' : ''}`}
              onClick={() => setActiveTab('public')}
            >
              Public Rooms
            </button>
          </div>
        </div>
        
        {activeTab === 'private' ? (
          <div className="chat-container">
            <div className="chat-sidebar">
              <div className="chat-list">
                {chats.map(chat => (
                  <div 
                    key={chat.id} 
                    className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
                    onClick={() => selectChat(chat.id)}
                  >
                    <div className="chat-avatar">
                      <img src={chat.user.avatar || '/images/avatar-placeholder.png'} alt={chat.user.name} />
                      {chat.user.online && <span className="online-indicator"></span>}
                    </div>
                    
                    <div className="chat-info">
                      <div className="chat-name">{chat.user.name}</div>
                      <div className="chat-last-message">{chat.lastMessage}</div>
                    </div>
                    
                    <div className="chat-meta">
                      <div className="chat-time">{chat.timestamp}</div>
                      {chat.unread > 0 && <div className="unread-badge">{chat.unread}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="chat-main">
              {activeChat ? (
                <>
                  <div className="chat-header-bar">
                    <div className="chat-user">
                      <div className="chat-avatar">
                        <img 
                          src={chats.find(c => c.id === activeChat)?.user.avatar || '/images/avatar-placeholder.png'} 
                          alt={chats.find(c => c.id === activeChat)?.user.name} 
                        />
                        {chats.find(c => c.id === activeChat)?.user.online && <span className="online-indicator"></span>}
                      </div>
                      
                      <div className="chat-user-info">
                        <div className="chat-user-name">{chats.find(c => c.id === activeChat)?.user.name}</div>
                        <div className="chat-user-status">
                          {chats.find(c => c.id === activeChat)?.user.online ? 'Online' : 'Offline'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="chat-actions">
                      <button className="chat-action-btn">
                        <i className="fas fa-phone"></i>
                      </button>
                      <button className="chat-action-btn">
                        <i className="fas fa-video"></i>
                      </button>
                      <button className="chat-action-btn">
                        <i className="fas fa-info-circle"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="messages-container">
                    <div className="messages-list">
                      {messages.map(msg => (
                        <div key={msg.id} className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                          <div className="message-content">
                            <p>{msg.content}</p>
                            <div className="message-meta">
                              <span className="message-time">{msg.timestamp}</span>
                              {msg.sender === 'me' && (
                                <span className="message-status">
                                  {msg.read ? <i className="fas fa-check-double"></i> : <i className="fas fa-check"></i>}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  
                  <div className="message-input-container">
                    <button className="message-action-btn">
                      <i className="fas fa-paperclip"></i>
                    </button>
                    
                    <textarea 
                      className="message-input" 
                      placeholder="Type a message..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                    ></textarea>
                    
                    <button className="message-action-btn">
                      <i className="fas fa-smile"></i>
                    </button>
                    
                    <button 
                      className="send-btn"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </>
              ) : (
                <div className="no-chat-selected">
                  <div className="no-chat-icon">
                    <i className="fas fa-comments"></i>
                  </div>
                  <h3>Select a conversation</h3>
                  <p>Choose a chat from the list to start messaging</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="public-rooms">
            <div className="rooms-grid">
              <div className="room-card">
                <div className="room-header">
                  <h3>Local Community</h3>
                  <div className="room-members">120 members online</div>
                </div>
                <div className="room-content">
                  <p>Chat with people in your local area about events, news, and community matters.</p>
                </div>
                               <div className="room-footer">
                  <button className="btn btn-primary">Join Room</button>
                </div>
              </div>
              {/* Add more room cards here if needed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
