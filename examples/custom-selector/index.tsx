import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ReduxRouter, ReduxRouterSelector } from '@lagunovsky/redux-react-router'
import { AppRoutes } from '../basic/routes'
import { store, State } from '../basic/store'

const routerSelector: ReduxRouterSelector = (state: State) => state.router

export function App() {
  return (
    <Provider store={store}>
      <ReduxRouter
        history={history}
        store={store}
        selector={routerSelector}
        children={<AppRoutes/>}
      />
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('react-root'))
