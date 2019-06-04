import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox
} from '@material-ui/core/';
import './css/MessageList.css';

const MessagesList = ({ isLoading, messages }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = id => () => {
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
        {!isLoading &&
          messages.map(message => (
            <ListItem key={message.id} button alignItems="flex-start">
              <ListItemText primary={message.subject} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="start"
                  onChange={handleToggle(message.id)}
                  checked={checked.indexOf(message.id) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </section>
  );
};

export default MessagesList;
