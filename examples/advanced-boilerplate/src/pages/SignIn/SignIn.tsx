
import { push } from '@lagunovsky/redux-react-router';
import React, { FormEvent, FunctionComponent, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticationCleared, fetchUser } from '../../store/slices/app';
import { AppDispatch, RootState } from '../../store/store';

import './SignIn.css';

const SignIn: FunctionComponent = () => {

  const dispatch = useDispatch<AppDispatch>();

  const errorMessage = useSelector( ( state: RootState ) => state.app.errorMessage );
  const loading = useSelector( ( state: RootState ) => state.app.loading );
  const succeeded = useSelector( ( state: RootState ) => state.app.authentication ) === 'succeeded';

  const onSubmit = ( event: FormEvent ) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(target));
    dispatch( fetchUser( {
      username: data.username as string,
      password: data.password as string,
    } ) );
  }

  const onForgotPassword = () => {
    dispatch( push( '/forgot-password' ) );
  }

  const onSignout = () => {
    dispatch( authenticationCleared() );
  }

  const onSettings = () => {
    dispatch( push( '/settings' ) );
  }

  return (
    <div className="page page-sign-in">
      <h2>Sign In</h2>

      <button
       onClick={ onForgotPassword }
      >Forgot password?</button>

      { /* Button to Settings page will only be shown if user authenticated successfully */ }

      { succeeded ? (
        <div>
          <button
            type="button"
            onClick={ onSettings }
          >Settings</button>
          <button
            type="button"
            onClick={ onSignout }
          >Signout</button>
        </div>
      ): (
      <form onSubmit={ onSubmit }>
        <input
          name="username"
          required
          placeholder="Username"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
        />
        <div className='page-sign-in__error-message'>
          { errorMessage }
        </div>
        <button
        disabled={ loading === 'pending' }
        >Signin</button>
      </form>

      )}
    </div>
  );
}

export default SignIn;
