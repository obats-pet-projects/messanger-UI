import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox
} from '@material-ui/core/';
import { httpService } from '../../../api/axios';
import Toolbar from '../Toolbar/Toolbar';
import Loader from '../../UI/Loader/Loader';
import { errorToaster } from '../../UI/Toaster/Toaster';
import './List.css';

const MessageList = ({ category }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [checkedMessages, setCheckedMessages] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const filterCheckedMessages = () => {
    const filteredMessages = messages.filter(message => !checkedMessages.includes(message.id));

    setMessages(filteredMessages);
    setIsChecked(false);
    setCheckedMessages('');
  };

  const handleSelectAllCheckbox = evt => {
    const checked = evt.currentTarget.checked ? true : false;

    if (messages.length > 0) {
      setIsChecked(checked);
    }

    if (checked) {
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

      const isAllChecked = newChecked.length === messages.length ? true : false;

      setIsChecked(isAllChecked);
      setCheckedMessages(newChecked);
    }
  };

  const fetchMessages = (category = 'inbox') => {
    httpService()
      .get(`/messages/mail/category/?category=${category}`)
      .then(res => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch(() => errorToaster('Something went wrong. Try again later.'));
  };

  useEffect(() => {
    setIsChecked(false);
    setCheckedMessages('');
    fetchMessages(category);
  }, [category]);

  return (
    <div className="messages-container">
      <Toolbar
        filterCheckedMessages={filterCheckedMessages}
        handleSelectAllCheckbox={handleSelectAllCheckbox}
        checkedMessages={checkedMessages}
        isChecked={isChecked}
        category={category}
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
                <ListItemText primary={message.subject} className="message-text" />
                <ListItemSecondaryAction className="message-checkbox">
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
