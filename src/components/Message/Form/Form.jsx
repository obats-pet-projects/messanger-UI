import React, { Component } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import axios from '../../api/axios';
import { messageSchema, initialValues } from './Validation';
import './NewMessage.css';

class NewMessageForm extends Component {
  state = {
    isSend: false
  };

  onSubmitClick = (values, actions) => {
    axios.post('/messages', values).then(() => {
      this.setState({ isSend: true });
      actions.resetForm({});
    });
  };

  render() {
    const { isSend } = this.state;

    const NewMessageView = props => {
      const { values, handleChange, handleBlur, handleSubmit, isValid, isSubmitting } = props;

      return (
        <Form onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <p>
              <label htmlFor="subject-field" className="custom-label">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject-field"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.subject || ''}
                className="subject-input"
              />
            </p>
            <ErrorMessage name="subject" />
            <p>
              <label htmlFor="message-field" className="custom-label">
                Message
              </label>
              <textarea
                name="message"
                id="message-field"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message || ''}
                className="message-textarea"
              />
            </p>
            <ErrorMessage name="message" />
          </fieldset>

          <button type="submit" disabled={isSubmitting || !isValid}>
            Send Message
          </button>
          {isSend && <div>Message sent</div>}
        </Form>
      );
    };
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={messageSchema}
        onSubmit={this.onSubmitClick}
        render={NewMessageView}
      />
    );
  }
}

export default NewMessageForm;
