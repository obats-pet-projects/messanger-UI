import React, { Fragment, useState, useEffect } from 'react';
import Header from '../Header/Header';
import MessageSidebar from './MessageSidebar';
import axios from '../../api/axios';
import './css/MessageContainer.css';
import './css/MessageView.css';

const MessageView = props => {
  console.log(props);
  const { id } = props.match.params;

  const [message, setMessage] = useState([]);

  useEffect(() => {
    axios
      .get(`/messages/${id}`)
      .then(res => {
        setMessage(res.data);
      })
      .catch(error => console.log(error));
  }, [id]);

  return (
    <Fragment>
      <Header />
      <main className="container">
        <MessageSidebar />
        <section className="message">
          <h2 className="message-subject ">{message.subject}</h2>
          <p>{message.message}</p>
        </section>
      </main>
    </Fragment>
  );
};

export default MessageView;
