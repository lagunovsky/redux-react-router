import React, { FunctionComponent, ReactNode, useEffect, PropsWithChildren, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { push } from '@lagunovsky/redux-react-router';

interface Props {
}

const ProtectedRoute: FunctionComponent = ( props:PropsWithChildren<Props> ) => {

  const authenticated = useSelector( (state:RootState) => state.app.authentication ) === 'succeeded';

  const dispatch = useDispatch<AppDispatch>();

  useEffect( () => {

    // Redirect if user is not authenticated
    if( !authenticated ) dispatch( push( '/' ) );
  }, [] );

  if( authenticated ) return <div>{props.children}</div>;

  return <div>Loading...</div>;
}

export default ProtectedRoute;
