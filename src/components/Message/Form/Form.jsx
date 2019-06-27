import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { newMessageService, setMessageSendStatus } from '../../../actions/messages';
import { messageSchema, initialValues } from './validation';
import { successToaster, errorToaster } from '../../UI/Toaster/Toaster';
import './Form.css';

const NewMessageForm = ({
  newMessageService,
  closeModal,
  appErrors,
  messageIsSent,
  setMessageSendStatus
}) => {
  const onSubmitClick = values => {
    newMessageService(values);
  };

  useEffect(() => {
    if (messageIsSent) {
      closeModal();
      successToaster('Message sent');
      setMessageSendStatus(false);
    }

    if (appErrors.type === 'server') {
      errorToaster(appErrors.message);
    }
  }, [appErrors.message, appErrors.type, closeModal, messageIsSent, setMessageSendStatus]);

  const NewMessageView = props => {
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = props;

    return (
      <Form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <TextField
            fullWidth
            error={!!errors.subject && touched.subject}
            label="Subject"
            variant="filled"
            name="subject"
            id="subject-field"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.subject || ''}
            className="input"
          />

          <TextField
            fullWidth
            multiline
            error={!!errors.message && touched.message}
            rows="10"
            label="Message"
            variant="filled"
            name="message"
            id="message-field"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.message || ''}
            className="input"
          />
        </fieldset>

        <Button variant="contained" color="primary" type="submit" className="form-button">
          Send
        </Button>
      </Form>
    );
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={messageSchema}
      onSubmit={onSubmitClick}
      render={NewMessageView}
    />
  );
};
const mapStateToProps = ({ appErrors, messageSendStatus }) => ({
  appErrors,
  messageIsSent: messageSendStatus.isSent
});

const mapDispatchToProps = dispatch => ({
  newMessageService: (values, resetForm) => {
    dispatch(newMessageService(values, resetForm));
  },
  setMessageSendStatus: status => {
    dispatch(setMessageSendStatus(status));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageForm);
