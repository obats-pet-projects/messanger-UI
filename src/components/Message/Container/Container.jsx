import React, { useState, useEffect } from 'react';
import MessageSidebar from '../Sidebar/Sidebar';
import MessageList from '../List/List';
import axios from '../../../api/axios.js';
import './Container.css';

const MessageContainer = () => {
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
  }, []);

  return (
    <main className="container">
      <MessageSidebar fetchMessages={fetchMessages} />
      <MessageList isLoading={isLoading} messages={messages} />
    </main>
  );
};

export default MessageContainer;
