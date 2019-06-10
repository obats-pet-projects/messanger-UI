import React, { Fragment } from 'react';
import { Tooltip, IconButton, Checkbox } from '@material-ui/core/';
import { toolbarActionLabels } from '../../utils/labels.js';
import axios from '../../../api/axios';
import './Toolbar.css';

const Toolbar = ({
  handleTooltipActionClick,
  checkedMessages,
  handleSelectAllCheckbox,
  isChecked,
  category
}) => {
  const handleTooltipClick = evt => {
    axios
      .patch('/messages', {
        messagesIds: checkedMessages,
        category: evt.currentTarget.value
      })
      .then(() => handleTooltipActionClick());
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
            {category !== label.value && (
              <Tooltip
                title={label.title}
                value={label.value}
                onClick={handleTooltipClick}
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
