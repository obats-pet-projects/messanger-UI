import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import { Button, TextField, Collapse } from '@material-ui/core';
import Error from '@material-ui/icons/Error';
import { authService } from '../../../actions/auth';
import { setAppErrors } from '../../../actions/appErrors';
import { errorToaster } from '../../UI/Toaster/Toaster';
import { signInSchema, initialValues } from './validation';
import './SignIn.css';

const SignIn = ({ isLogged, authService, setAppErrors, appErrors }) => {
  const onSubmitClick = values => {
    const url = '/auth/signin';

    authService(url, values);
  };

  useEffect(() => {
    if (appErrors.type === 'credential') {
      setAppErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (appErrors.type === 'server') {
      errorToaster(appErrors.message);
    }
  }, [appErrors.message, appErrors.type]);

  const SignInView = props => {
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = props;

    const isEmailError = Boolean(
      (!!errors.email && touched.email) || appErrors.type === 'credential'
    );
    const isPasswordError = Boolean(
      (!!errors.password && touched.password) || appErrors.type === 'credential'
    );

    return (
      <Fragment>
        {!isLogged ? (
          <div className="signin-container">
            <Form className="signin-form" onSubmit={handleSubmit}>
              <header className="signin-form__header">
                <h1>Sign in</h1>
                <p>with your Messanger Account</p>
              </header>
              <div className="signin-form__input-wraper">
                <TextField
                  fullWidth
                  error={isEmailError}
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
                <Collapse in={isEmailError}>
                  <div className="signin-form__error-message">
                    <Error />
                    {appErrors.type === 'credential' ? (
                      appErrors.message
                    ) : (
                      <ErrorMessage name="email" />
                    )}
                  </div>
                </Collapse>
              </div>

              <div className="signin-form__input-wraper">
                <TextField
                  fullWidth
                  error={isPasswordError}
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
                <Collapse in={isPasswordError}>
                  <div className="signin-form__error-message">
                    <Error />
                    {appErrors.type === 'credential' ? (
                      appErrors.message
                    ) : (
                      <ErrorMessage name="password" />
                    )}
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
        ) : (
          <Redirect to="/" />
        )}
      </Fragment>
    );
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

const mapStateToProps = ({ user, appErrors }) => ({
  isLogged: user.isLogged,
  appErrors
});

const mapDispatchToProps = dispatch => ({
  authService: (url, credentials) => {
    dispatch(authService(url, credentials));
  },
  setAppErrors: status => {
    dispatch(setAppErrors(status));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
