import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { Button, TextField } from '@material-ui/core';
import axios from '../../../api/axios';
import { messageSchema, initialValues } from './validation';
import { successToaster } from '../../UI/Toaster/Toaster';
import './Form.css';

const NewMessageForm = ({ closeModal }) => {
  const onSubmitClick = (values, actions) => {
    axios
      .post('/messages', values)
      .then(() => {
        actions.resetForm({});
        closeModal();
        successToaster('Message sent');
      })
      .catch(error => console.log(error));
  };

  const NewMessageView = props => {
    const { values, handleChange, handleBlur, handleSubmit, isValid } = props;
    console.log(values);
    console.log('isValid: ', isValid);

    return (
      <Form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <TextField
            fullWidth
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

        <div className="errors-block">
          <p>
            <ErrorMessage name="subject" />
          </p>
          <p>
            <ErrorMessage name="message" />
          </p>
        </div>

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
