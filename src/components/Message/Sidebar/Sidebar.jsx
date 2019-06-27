import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItemIcon, ListItemText } from '@material-ui/core';
import NewMessageModal from '../Modal/Modal';
import { categoriesLabel } from '../../utils/labels.js';
import './Sidebar.css';

const MessageSidebar = ({ category }) => {
  return (
    <div className="sidebar">
      <NewMessageModal />
      <List component="nav">
        <ul className="sidebar-list">
          {categoriesLabel.map((label, index) => (
            <li key={index} className="sidebar-item">
              <Link
                to={`/mail/category/?category=${label.value}`}
                className={`sidebar-link ${category === label.value ? 'sidebar-link--active' : ''}`}
              >
                <ListItemIcon>
                  <label.icon />
                </ListItemIcon>
                <ListItemText primary={label.title} />
              </Link>
            </li>
          ))}
        </ul>
      </List>
    </div>
  );
};

export default MessageSidebar;
