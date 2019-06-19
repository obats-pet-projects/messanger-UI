import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import axios from '../../../api/axios';
import { saveUserData } from '../../../actions/user';
import { signInSchema, initialValues } from './validation';
import { errorToaster } from '../../UI/Toaster/Toaster';
import './SignIn.css';

const accessToken = localStorage.getItem('access-token');

const SignIn = ({ history, loggedUser, saveUserData }) => {
  const onSubmitClick = values => {
    axios
      .post('/auth/signin', values)
      .then(({ data, headers }) => {
        console.log(accessToken);
        localStorage.setItem('access-token', headers['access-token']);
        const { id, username, email } = data.user;
        saveUserData({ id, username, email });
        history.push('/');
      })
      .catch(() => {
        errorToaster('Something went wrong. Try again later.');
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
