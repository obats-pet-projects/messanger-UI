import React from 'react';
import MessageSidebar from '../Sidebar/Sidebar';
import MessageList from '../List/List';
import './Container.css';

const MessageContainer = props => {
  let category;

  if (props.location) {
    category = props.location.search.substring(props.location.search.indexOf('=') + 1);
  }

  return (
    <main className="container">
      <MessageSidebar />
      <MessageList category={category} />
    </main>
  );
};

export default MessageContainer;
