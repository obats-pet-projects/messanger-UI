import React from 'react';
import { Formik, Form } from 'formik';
import { NewMessageSchema, initialValues } from '../../utils/NewMessageUtils';
import './NewMessage.css';

const onSubmitClick = (values, actions) => {
  console.log('Button pressed');
};

const NewMessageForm = props => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting
  } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset className="fieldset">
        <p>
          <label htmlFor="title-field" className="custom-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title-field"
            onChange={handleChange}
            onBlur={handleBlur}
            className="title-input"
          />
        </p>
        <p>
          <label htmlFor="message-field" className="custom-label">
            Message
          </label>
          <textarea
            name="message"
            id="message-field"
            onChange={handleChange}
            onBlur={handleBlur}
            className="message-textarea"
          />
        </p>
      </fieldset>

      <button type="submit" disabled={isSubmitting || !isValid}>
        Send Message
      </button>
    </Form>
  );
};

const NewMessage = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NewMessageSchema}
      onSubmit={onSubmitClick}
      render={NewMessageForm}
    />
  );
};

export default NewMessage;
