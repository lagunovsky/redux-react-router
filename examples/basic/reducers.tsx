import { combineReducers } from 'redux'
import { createRouterReducer } from '@lagunovsky/redux-react-router'
import { browserHistory } from './history'

export const rootReducer = combineReducers({
  router: createRouterReducer(browserHistory),
  // ...rest of your reducers
})
