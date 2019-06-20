import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { httpService } from '../../../api/axios';
import { saveUserData } from '../../../actions/user';
import { signInSchema, initialValues } from './validation';
import { errorToaster } from '../../UI/Toaster/Toaster';
import './SignIn.css';

const SignIn = ({ loggedUser, saveUserData }) => {
  const onSubmitClick = values => {
    httpService()
      .post('/auth/signin', values)
      .then(({ data, headers }) => {
        const { id, username, email } = data.user;

        localStorage.setItem('access-token', headers['access-token']);

        saveUserData({ id, username, email });
      })
      .catch(error => {
        errorToaster(error.response.data.message);
      });
  };

  const SignInView = props => {
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = props;

    if (!loggedUser) {
      return (
        <div className="signin-container">
          <Form className="signin-form" onSubmit={handleSubmit}>
            <header className="signin-form__header">
              <h1>Sign in</h1>
              <p>with your Messanger Account</p>
            </header>
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
  loggedUser: user.loggedUser
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
