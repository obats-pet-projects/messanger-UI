import React, { Fragment } from 'react';
import { Tooltip, IconButton, Checkbox, Button } from '@material-ui/core/';
import { httpService } from '../../../api/axios';
import { toolbarActionLabels } from '../../utils/labels';
import { infoToaster, errorToaster } from '../../UI/Toaster/Toaster';
import './Toolbar.css';

const Toolbar = ({
  filterCheckedMessages,
  handleSelectAllCheckbox,
  checkedMessages,
  isChecked,
  category
}) => {
  const handleTooltipClick = (evt, title) => {
    httpService()
      .patch('/messages', { messagesIds: checkedMessages, category: evt.currentTarget.value })
      .then(() => {
        filterCheckedMessages();
        infoToaster(`Moved to ${title}`);
      })
      .catch(() => errorToaster('Something went wrong. Try again later.'));
  };

  const handleDeleteForeverClick = () => {
    const messageNumber = checkedMessages.length === 1 ? 1 : checkedMessages.length;

    httpService()
      .delete('/messages', {
        data: { messagesIds: checkedMessages }
      })
      .then(() => {
        if (messageNumber > 1) {
          infoToaster(`${messageNumber} messages were deleted forever`);
        } else {
          infoToaster(`${messageNumber} message was deleted forever`);
        }
        filterCheckedMessages();
      })
      .catch(() => errorToaster('Something went wrong. Try again later.'));
  };

  const deleteForeverButton = labelValue => {
    if (category === 'trash' && labelValue === 'trash') {
      return (
        <Button className="delete-forever" onClick={handleDeleteForeverClick}>
          Delete forever
        </Button>
      );
    }
  };

  return (
    <div className="toolbar-container">
      <Tooltip title="Select">
        <Checkbox
          onChange={handleSelectAllCheckbox}
          color="primary"
          checked={isChecked}
          className="tooltip-action"
        />
      </Tooltip>

      {checkedMessages.length > 0 &&
        toolbarActionLabels.map((label, index) => (
          <Fragment key={index}>
            {deleteForeverButton(label.value)}
            {category !== label.value && (
              <Tooltip
                title={label.title}
                value={label.value}
                onClick={evt => handleTooltipClick(evt, label.title)}
                className="tooltip-action"
                disabled={category === label.value}
              >
                <IconButton aria-label={label.title}>
                  <label.icon />
                </IconButton>
              </Tooltip>
            )}
          </Fragment>
        ))}
    </div>
  );
};

export default Toolbar;
