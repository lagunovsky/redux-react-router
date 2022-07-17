import { combineReducers } from "redux";
import { createRouterReducer } from '@lagunovsky/redux-react-router'
import browserHistory from '../history'

import app from "./slices/app";

const router = createRouterReducer( browserHistory );

export default combineReducers({
  router,
  app,
} );

