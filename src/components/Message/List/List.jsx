import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Checkbox } from '@material-ui/core/';
import { fetchMessagesByCategory } from '../../../actions/messages';
import Toolbar from '../Toolbar/Toolbar';
import Loader from '../../UI/Loader/Loader';
import { errorToaster } from '../../UI/Toaster/Toaster';
import './List.css';

const MessageList = ({ category, fetchMessagesByCategory, messagesList, isLoading, appErrors }) => {
  const [checkedMessages, setCheckedMessages] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const filterCheckedMessages = () => {
    const filteredMessages = messagesList.filter(message => !checkedMessages.includes(message.id));

    fetchMessagesByCategory(filteredMessages);
    setIsChecked(false);
    setCheckedMessages('');
  };

  const handleSelectAllCheckbox = evt => {
    const checked = evt.currentTarget.checked ? true : false;

    if (messagesList.length > 0) {
      setIsChecked(checked);
    }

    if (checked) {
      messagesList.map(message => setCheckedMessages(prevState => [...prevState, message.id]));
    } else {
      setCheckedMessages('');
    }
  };

  const handleCheckboxClick = id => {
    const currentIndex = checkedMessages.indexOf(id);
    let newChecked = [...checkedMessages];

    if (currentIndex === -1) {
      newChecked = [...newChecked, id];
    } else {
      newChecked.splice(currentIndex, 1);
    }

    const isAllChecked = newChecked.length === messagesList.length;

    setIsChecked(isAllChecked);
    setCheckedMessages(newChecked);
  };

  useEffect(() => {
    const fetchMessages = (category = 'inbox') => {
      fetchMessagesByCategory(category);
    };

    setIsChecked(false);
    setCheckedMessages('');
    fetchMessages(category);

    if (appErrors.type === 'server') {
      errorToaster(appErrors.message);
    }

    return () => fetchMessages(category);
  }, [appErrors.message, appErrors.type, category, fetchMessagesByCategory]);

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
        ) : messagesList.length > 0 ? (
          messagesList.map(message => (
            <ListItem key={message.id} className="message-item">
              <Checkbox
                className="message-checkbox"
                color="primary"
                checked={checkedMessages.indexOf(message.id) !== -1}
                onClick={() => handleCheckboxClick(message.id)}
              />
              <Link to={`/${message.id}`} className="message-link">
                <ListItemText primary={message.subject} className="message-text" />
              </Link>
            </ListItem>
          ))
        ) : (
          <div>
            <h4 className="no-messages">No messages in this category</h4>
          </div>
        )}
      </List>
    </div>
  );
};

const mapStateToProps = ({ loader, messages, appErrors }) => ({
  isLoading: loader.isLoading,
  messagesList: messages.messagesList,
  appErrors
});

const mapDispatchToProps = dispatch => ({
  fetchMessagesByCategory: data => {
    dispatch(fetchMessagesByCategory(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);
