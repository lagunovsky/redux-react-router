import { applyMiddleware, compose, createStore } from 'redux'
import { createRouterMiddleware, ReduxRouterState} from '@lagunovsky/redux-react-router'
import { rootReducer } from './reducers'
import { browserHistory } from './history'

export type State = { router: ReduxRouterState }

const routerMiddleware = createRouterMiddleware(browserHistory)

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      routerMiddleware, // for dispatching history actions
      // ... other middlewares
    ),
  ),
)
