import { push } from '@lagunovsky/redux-react-router';
import React, { FunctionComponent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';

interface Props {
}

const ForgotPassword:FunctionComponent<Props> = () => {

  const dispatch = useDispatch<AppDispatch>();

  const onBack = () => {
    dispatch( push( '/' ) );
  }

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>
        Just an example page to demonstrate another redux react router push action.
      </p>
      <button
        onClick={ onBack }
      >Back</button>
    </div>
  );
}

export default ForgotPassword;
