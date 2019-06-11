import React, { useState, Fragment } from 'react';
import { Button, Dialog, DialogContent, IconButton } from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import NewMassageForm from '../Form/Form';
import './Modal.css';

const NewMessageModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <Button className="new-message-button" onClick={handleClickOpen}>
        Compose
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
        <header className="modal-header">
          <h3>New Message</h3>
          <IconButton aria-label="Close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </header>
        <DialogContent dividers className="modal-content">
          <NewMassageForm closeModal={handleClose} />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default NewMessageModal;
