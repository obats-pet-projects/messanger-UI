import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import PeopleIcon from '@material-ui/icons/People';
import './css/MessageSidebar.css';

const MessageSidebar = ({ fetchMessages }) => (
  <aside className="sidebar">
    <List component="nav">
      <ListItem
        component="button"
        value="inbox"
        button
        onClick={evt => fetchMessages(evt.currentTarget.value)}
      >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>
      <ListItem
        component="button"
        value="social"
        button
        onClick={evt => fetchMessages(evt.currentTarget.value)}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Social" />
      </ListItem>
      <ListItem
        component="button"
        value="advertisement"
        button
        onClick={evt => fetchMessages(evt.currentTarget.value)}
      >
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Advertisement" />
      </ListItem>
      <ListItem
        component="button"
        value="spam"
        button
        onClick={evt => fetchMessages(evt.currentTarget.value)}
      >
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Spam" />
      </ListItem>
    </List>
  </aside>
);

export default MessageSidebar;
