import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import { Button, TextField, Collapse } from '@material-ui/core';
import Error from '@material-ui/icons/Error';
import { authService } from '../../../actions/auth';
import { setAppErrors } from '../../../actions/appErrors';
import { signUpSchema, initialValues } from './validation';
import { errorToaster } from '../../UI/Toaster/Toaster';
import './SignUp.css';

const SignUp = ({ isLogged, authService, setAppErrors, appErrors }) => {
  const onSubmitClick = values => {
    const url = '/auth/signup';

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

  const SignUpView = props => {
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = props;

    const isUsernameError = Boolean(
      (!!errors.username && touched.username) || appErrors.type === 'credential'
    );
    const isEmailError = Boolean(
      (!!errors.email && touched.email) || appErrors.type === 'credential'
    );

    return (
      <Fragment>
        {!isLogged ? (
          <div className="signup-container">
            <div className="signup-wrapper">
              <Form className="signup-form" onSubmit={handleSubmit}>
                <h2 className="signup-form__title">Create your Messanger Account</h2>
                <div className="signup-form__input-wraper">
                  <TextField
                    fullWidth
                    error={isUsernameError}
                    variant="outlined"
                    id="username-field"
                    label="Username"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username || ''}
                    className="signup-form__input"
                  />
                  <Collapse in={isUsernameError}>
                    <div className="signup-form__error-message">
                      <Error />
                      {touched.username && appErrors.type === 'credential' ? (
                        appErrors.message
                      ) : (
                        <ErrorMessage name="username" />
                      )}
                    </div>
                  </Collapse>
                </div>

                <div className="signup-form__input-wraper">
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
                    className="signup-form__input"
                  />
                  <Collapse in={isEmailError}>
                    <div className="signup-form__error-message">
                      <Error />
                      {appErrors.type === 'credential' ? (
                        appErrors.message
                      ) : (
                        <ErrorMessage name="email" />
                      )}
                    </div>
                  </Collapse>
                </div>

                <div className="signup-form__input-wraper">
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
                    className="signup-form__input"
                  />
                  <Collapse in={!!errors.password && touched.password}>
                    <div className="signup-form__error-message">
                      <Error />
                      <ErrorMessage name="password" />
                    </div>
                  </Collapse>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="signup-form__submit"
                >
                  Sign Up
                </Button>
                <div className="signup-form__link">
                  <Link to={'/auth/signin'}>Sign in instead</Link>
                </div>
              </Form>
            </div>
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
      validationSchema={signUpSchema}
      onSubmit={onSubmitClick}
      render={SignUpView}
    />
  );
};

const mapStateToProps = ({ user, appErrors }) => ({
  isLogged: user.isLogged,
  appErrors
});

const mapDispatchToProps = dispatch => ({
  authService: (url, values) => {
    dispatch(authService(url, values));
  },
  setAppErrors: status => {
    dispatch(setAppErrors(status));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
