import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ReduxRouter } from '@lagunovsky/redux-react-router'
import { AppRoutes } from './routes'
import { store } from './store'

export function App() {
  return (
    <Provider store={store}>
      <ReduxRouter
        history={history}
        store={store}
        children={<AppRoutes/>}
      />
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('react-root'))
