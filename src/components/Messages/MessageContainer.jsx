import React, { useState, useEffect } from 'react';
import MessageSidebar from './MessageSidebar';
import MessageList from './MessageList';
import axios from '../../api/axios';
import './css/MessageContainer.css';

const MessagesContainer = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchMessages = (category = 'inbox') => {
    axios
      .get(`/messages/category/${category}`)
      .then(res => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchMessages();

    return () => fetchMessages();
  }, []);

  return (
    <main className="container">
      <MessageSidebar fetchMessages={fetchMessages} />
      <MessageList isLoading={isLoading} messages={messages} />
    </main>
  );
};

export default MessagesContainer;
