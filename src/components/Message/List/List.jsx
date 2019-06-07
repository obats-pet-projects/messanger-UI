import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox
} from '@material-ui/core/';
import axios from '../../../api/axios.js';
import Toolbar from '../Toolbar/Toolbar';
import Loader from '../../UI/Loader/Loader';
import './List.css';

const MessageList = ({ category }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [checkedMessages, setCheckedMessages] = useState([]);

  const handleTooltipActionClick = () => {
    const filteredMessages = messages.filter(message => !checkedMessages.includes(message.id));

    setMessages(filteredMessages);
  };

  const handleSelectAllCheckbox = evt => {
    if (evt.target.checked) {
      messages.map(message => setCheckedMessages(prevState => [...prevState, message.id]));
    } else {
      setCheckedMessages('');
    }
  };

  const handleCheckboxClick = (evt, id) => {
    if (evt.target.nodeName === 'INPUT') {
      evt.preventDefault();

      const currentIndex = checkedMessages.indexOf(id);
      let newChecked = [...checkedMessages];

      if (currentIndex === -1) {
        newChecked = [...newChecked, id];
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setCheckedMessages(newChecked);
    }
  };

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
    <div className="messages-container">
      <Toolbar
        handleTooltipActionClick={handleTooltipActionClick}
        checkedMessages={checkedMessages}
        messages={messages}
        handleSelectAllCheckbox={handleSelectAllCheckbox}
      />
      <List className="message-list">
        {isLoading ? (
          <Loader />
        ) : messages.length > 0 ? (
          messages.map(message => (
            <ListItem key={message.id} className="message-item">
              <Link
                to={`/${message.id}`}
                className="message-link"
                onClick={evt => handleCheckboxClick(evt, message.id)}
              >
                <ListItemText primary={message.subject} />
                <ListItemSecondaryAction>
                  <Checkbox color="primary" checked={checkedMessages.indexOf(message.id) !== -1} />
                </ListItemSecondaryAction>
              </Link>
            </ListItem>
          ))
        ) : (
          <div>
            <h4 className="empty-messages">No messages in this category</h4>
          </div>
        )}
      </List>
    </div>
  );
};

export default MessageList;
