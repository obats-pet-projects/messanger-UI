import React, { useState, useEffect } from 'react';
import MessageSidebar from '../Sidebar/Sidebar';
import MessageList from '../List/List';
import axios from '../../../api/axios.js';
import './Container.css';

const MessageContainer = props => {
  let category;

  if (props.location) {
    category = props.location.search.substring(props.location.search.indexOf('=') + 1);
  }

  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchMessages = (category = 'inbox') => {
    axios
      .get(`/messages/mail/category/?category=${category}`)
      .then(res => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchMessages(category);
  }, [category]);

  return (
    <main className="container">
      <MessageSidebar fetchMessages={fetchMessages} />
      <MessageList isLoading={isLoading} messages={messages} />
    </main>
  );
};

export default MessageContainer;
