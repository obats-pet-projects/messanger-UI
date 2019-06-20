import React, { Fragment, useState, useEffect } from 'react';
import MessageSidebar from '../Sidebar/Sidebar';
import { httpService } from '../../../api/axios';
import '../Container/Container.css';
import '../View/View.css';

const MessageView = props => {
  const { id } = props.match.params;

  const [message, setMessage] = useState([]);

  useEffect(() => {
    httpService()
      .get(`/messages/${id}`)
      .then(res => {
        setMessage(res.data);
      })
      .catch(error => console.log(error));
  }, [id]);

  return (
    <Fragment>
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
