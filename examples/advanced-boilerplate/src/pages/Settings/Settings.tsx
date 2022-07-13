
import { push } from '@lagunovsky/redux-react-router';
import React, { FunctionComponent, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

const Settings:FunctionComponent = () => {

  const dispatch = useDispatch<AppDispatch>();

  const errorMessage = useSelector( ( state: RootState ) => state.app.errorMessage );
  const loading = useSelector( ( state: RootState ) => state.app.loading );

  const onClick = () => {
    dispatch( push( '/' ) );
  }

  return (
    <div>
      <h2>Settings</h2>
      <p>
        Since this page is a child of <strong>ProtectedRoute</strong> you should only
        be able to see this page after you successfully authenticated.
      </p>
      <p>
        Try visiting this page in a <a href="/settings" target="_blank">new tab</a> for example.
        You will be redirected back to the signin page since this example app is not storing
        the authenication state not permanent.
      </p>
      <button
       onClick={ onClick }
      >Back</button>
    </div>
  );
}

export default Settings;
