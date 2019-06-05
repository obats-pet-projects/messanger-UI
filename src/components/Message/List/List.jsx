import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox
} from '@material-ui/core/';

import Loader from '../../UI/Loader/Loader';
import './List.css';
import { Link } from 'react-router-dom';

const MessagesList = ({ isLoading, messages }) => {
  const [checked, setChecked] = useState([]);

  const handleLinkClick = evt => {
    console.log(evt.target.nodeName);
    if (evt.target.nodeName === 'INPUT') {
      evt.preventDefault();
    }
  };

  const handleToggle = id => {
    const currentIndex = checked.indexOf(id);
    let newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked = [...newChecked, id];
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <section className="container">
      <List className="message-list">
        {isLoading ? (
          <Loader />
        ) : messages.length > 0 ? (
          messages.map(message => (
            <Link
              key={message.id}
              to={message.id}
              className="message-item"
              onClick={handleLinkClick}
            >
              <ListItem>
                <ListItemText primary={message.subject} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="start"
                    onChange={() => handleToggle(message.id)}
                    checked={checked.indexOf(message.id) !== -1}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          ))
        ) : (
          <div>
            <h4 className="empty-messages">No messages in this category</h4>
          </div>
        )}
      </List>
    </section>
  );
};

export default MessagesList;
