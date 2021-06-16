Redux React Router
======================
A Redux binding for React Router v6


Main features
-------------
- Synchronize router state with redux store through uni-directional flow (i.e. history -> store -> router -> components).

- Supports [React Router v6](https://github.com/ReactTraining/react-router/tree/dev) and [History v5](https://github.com/ReactTraining/history)

- Supports functional component hot reloading while preserving state.

- Dispatching of history methods (`push`, `replace`, `go`, `goBack`, `goForward`) works for both [redux-thunk](https://github.com/gaearon/redux-thunk)
and [redux-saga](https://github.com/yelouafi/redux-saga).

- Nested children can access routing state such as the current location directly with `react-redux`'s `connect`.

- Supports time traveling in Redux DevTools.

- TypeScript


Installation
-----------
Redux React Router requires **React 16.8, React Redux 6.0, React Router 6.0 or later**.

    $ npm install --save @lagunovsky/redux-react-router

Or

    $ yarn add @lagunovsky/redux-react-router

Usage
-----

See the [examples](https://github.com/lagunovsky/redux-react-router/tree/master/examples) folder

Note: the `history` object provided to `router` reducer, `routerMiddleware`, and `ReduxRouter` component must be the same `history` object.
