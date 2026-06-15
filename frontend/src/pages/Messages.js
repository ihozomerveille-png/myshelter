import React, { useState, useEffect } from 'react';
import { messageAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Messages.css';

export default function Messages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await messageAPI.getAll();
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group messages by conversation
  const conversations = {};
  messages.forEach(msg => {
    const otherUser = msg.senderId._id === user?.id ? msg.receiverId : msg.senderId;
    const key = otherUser._id;
    if (!conversations[key]) {
      conversations[key] = { user: otherUser, messages: [] };
    }
    conversations[key].messages.push(msg);
  });

  const conversationList = Object.values(conversations);

  if (loading) {
    return <div className="messages-container">Loading messages...</div>;
  }

  return (
    <div className="messages-container">
      <h1>Messages</h1>

      <div className="messages-layout">
        {/* Conversations List */}
        <div className="conversations-list">
          <h3>Conversations</h3>
          {conversationList.length === 0 ? (
            <p className="no-messages">No messages yet</p>
          ) : (
            conversationList.map(conv => (
              <div
                key={conv.user._id}
                className={`conversation-item ${selectedConversation?.user._id === conv.user._id ? 'active' : ''}`}
                onClick={() => setSelectedConversation(conv)}
              >
                <div className="conversation-avatar">
                  {conv.user.profileImage ? (
                    <img src={conv.user.profileImage} alt={conv.user.fullName} />
                  ) : (
                    <div className="avatar-placeholder">{conv.user.fullName.charAt(0)}</div>
                  )}
                </div>
                <div className="conversation-info">
                  <h4>{conv.user.fullName}</h4>
                  <p className="last-message">
                    {conv.messages[conv.messages.length - 1]?.message.substring(0, 50)}...
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {selectedConversation ? (
            <>
              <div className="chat-header">
                <h3>{selectedConversation.user.fullName}</h3>
                <p className="user-role">{selectedConversation.user.role === 'landlord' ? '🏠 Landlord' : '🔍 House Finder'}</p>
              </div>

              <div className="messages-list">
                {selectedConversation.messages.map(msg => (
                  <div
                    key={msg._id}
                    className={`message ${msg.senderId._id === user?.id ? 'sent' : 'received'}`}
                  >
                    <p>{msg.message}</p>
                    <span className="message-time">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-chat">
              <p>Select a conversation to view messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
