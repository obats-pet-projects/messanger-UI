import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItemIcon, ListItemText } from '@material-ui/core';
import labelList from './labels.js';
import './Sidebar.css';

const MessageSidebar = ({ fetchMessages }) => (
  <aside className="sidebar">
    <List component="nav">
      <ul className="sidebar-list">
        {labelList.map((label, index) => (
          <li key={index} className="sidebar-item">
            <Link
              to={`/mail/category/?category=${label.value.toLowerCase()}`}
              className="sidebar-link"
            >
              <ListItemIcon>
                <label.icon />
              </ListItemIcon>
              <ListItemText primary={label.value} />
            </Link>
          </li>
        ))}
      </ul>
    </List>
  </aside>
);

export default MessageSidebar;
