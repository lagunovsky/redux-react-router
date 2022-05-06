import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ReduxRouter } from '@lagunovsky/redux-react-router'
import { browserHistory } from './history'
import { AppRoutes } from './routes'
import { store } from './store'

export function App() {
  return (
    <Provider store={store}>
      <ReduxRouter
        history={browserHistory}
        store={store}
        children={<AppRoutes/>}
      />
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('react-root'))
