import React from 'react';
import MessageSidebar from '../Sidebar/Sidebar';
import MessageList from '../List/List';
import './Container.css';

const MessageContainer = props => {
  let category;

  if (props.location) {
    const urlParams = new URLSearchParams(props.location.search);
    category = urlParams.get('category');
  }

  return (
    <main className="container">
      <MessageSidebar category={category} />
      <MessageList category={category} />
    </main>
  );
};

export default MessageContainer;
