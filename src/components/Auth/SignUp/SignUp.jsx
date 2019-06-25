import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import { Button, TextField, Collapse } from '@material-ui/core';
import Error from '@material-ui/icons/Error';
import { signUpService } from '../../../actions/auth';
import { signUpSchema, initialValues } from './validation';
import successIcon from './success.svg';
import './SignUp.css';

const SignUp = ({ history, isLogged, signUpService, authError }) => {
  const onSubmitClick = (values, { setFieldError }) => {
    signUpService(values);
  };

  const onConfirmButtonClick = () => {
    history.push('/');
  };

  const SignUpView = props => {
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = props;

    return (
      <div>
        {!isLogged ? (
          <div className="signup-container">
            <div className={`signup-wrapper`}>
              <Form className="signup-form" onSubmit={handleSubmit}>
                <h2 className="signup-form__title">Create your Messanger Account</h2>
                <div className="signup-form__input-wraper">
                  <TextField
                    fullWidth
                    error={!!errors.username && touched.username}
                    variant="outlined"
                    id="username-field"
                    label="Username"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username || ''}
                    className="signup-form__input"
                  />
                  <Collapse in={!!errors.username && touched.username}>
                    <div className="signup-form__error-message">
                      <Error />
                      <ErrorMessage name="username" />
                    </div>
                  </Collapse>
                </div>

                <div className="signup-form__input-wraper">
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
                    className="signup-form__input"
                  />
                  <Collapse in={!!errors.email && touched.email}>
                    <div className="signup-form__error-message">
                      <Error />
                      <ErrorMessage name="email" />
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

              <div className="signup-success">
                <header className="signup-success__header">
                  <img src={successIcon} alt="success" width="120" height="120" />
                  <h2>Registration completed successfully</h2>
                </header>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  className="signup-success__button"
                  onClick={onConfirmButtonClick}
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
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

const mapStateToProps = ({ user, authError }) => ({
  isLogged: user.isLogged,
  authError
});

const mapDispatchToProps = dispatch => ({
  signUpService: data => {
    dispatch(signUpService(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
