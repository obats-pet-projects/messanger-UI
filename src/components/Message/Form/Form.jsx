import React from 'react';
import { Formik, Form } from 'formik';
import { Button, TextField } from '@material-ui/core';
import axios from '../../../api/axios';
import { messageSchema, initialValues } from './validation';
import { successToaster, errorToaster } from '../../UI/Toaster/Toaster';
import './Form.css';

const NewMessageForm = ({ closeModal }) => {
  const onSubmitClick = (values, actions) => {
    axios
      .post('/messages', values)
      .then(({ data }) => {
        if (!!data.success) {
          return errorToaster(data.message);
        } else {
          actions.resetForm({});
          closeModal();
          successToaster('Message sent');
        }
      })
      .catch(() => errorToaster('Something went wrong. Try again later.'));
  };

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

export default NewMessageForm;
