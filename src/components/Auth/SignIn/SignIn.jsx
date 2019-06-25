import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import { Button, TextField, Collapse } from '@material-ui/core';
import Error from '@material-ui/icons/Error';
import { httpService } from '../../../api/axios';
import { saveUserData } from '../../../actions/user';
import { errorToaster } from '../../UI/Toaster/Toaster';
import { signInSchema, initialValues } from './validation';
import './SignIn.css';

const SignIn = ({ isLogged, saveUserData }) => {
  const onSubmitClick = (values, { setFieldError }) => {
    httpService()
      .post('/auth/signin', values)
      .then(({ data, headers }) => {
        const { id, username, email } = data.user;

        localStorage.setItem('access-token', headers['access-token']);
        saveUserData({ id, username, email });
      })
      .catch(({ response }) => {
        if (response) {
          const { message } = response.data;

          if (response.status === 400) {
            setFieldError('email', message);
            setFieldError('password', message);
          } else {
            errorToaster(message);
          }
        } else {
          errorToaster('Server is down. Please try again later');
        }
      });
  };

  const SignInView = props => {
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = props;

    if (!isLogged) {
      return (
        <div className="signin-container">
          <Form className="signin-form" onSubmit={handleSubmit}>
            <header className="signin-form__header">
              <h1>Sign in</h1>
              <p>with your Messanger Account</p>
            </header>
            <div className="signin-form__input-wraper">
              <TextField
                fullWidth
                error={!!errors.email && touched.email}
                variant="outlined"
                type="email"
                id="email-field"
                label="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email || ''}
                className="signin-form__input"
              />
              <Collapse in={!!errors.email && touched.email}>
                <div className="signin-form__error-message">
                  <Error />
                  <ErrorMessage name="email" />
                </div>
              </Collapse>
            </div>

            <div className="signin-form__input-wraper">
              <TextField
                fullWidth
                error={!!errors.password && touched.password}
                variant="outlined"
                type="password"
                id="password-field"
                label="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password || ''}
                className="signin-form__input"
              />
              <Collapse in={!!errors.password && touched.password}>
                <div className="signin-form__error-message">
                  <Error />
                  <ErrorMessage name="password" />
                </div>
              </Collapse>
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="signin-form__submit"
            >
              Sign in
            </Button>
            <div className="signin-form__link">
              <Link to={'/auth/signup'}>Create account</Link>
            </div>
          </Form>
        </div>
      );
    }
    return <Redirect to="/" />;
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={onSubmitClick}
      render={SignInView}
    />
  );
};

const mapStateToProps = ({ user }) => ({
  isLogged: user.isLogged
});

const mapDispatchToProps = dispatch => ({
  saveUserData: data => {
    dispatch(saveUserData(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
