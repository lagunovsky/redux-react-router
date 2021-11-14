import { Action, History, Location } from 'history'
import React from 'react'
import { Router } from 'react-router'
import { Middleware, Reducer, Store } from 'redux'


// Actions

export type Methods = 'push' | 'replace' | 'go' | 'back' | 'forward'

/**
 * This action type will be dispatched when your history
 * receives a location change.
 */
export const ROUTER_ON_LOCATION_CHANGED = '@@router/ON_LOCATION_CHANGED'

export type LocationChangeAction = {
  type: typeof ROUTER_ON_LOCATION_CHANGED
  payload: {
    location: Location
    action: Action
  }
}

export const onLocationChanged = (location: Location, action: Action): LocationChangeAction => ({
  type: ROUTER_ON_LOCATION_CHANGED,
  payload: { location, action },
})


/**
 * This action type will be dispatched by the history actions below.
 * If you're writing a middleware to watch for navigation events, be sure to
 * look for actions of this type.
 */
export const ROUTER_CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD'

export type UpdateLocationAction<M extends Methods = Methods> = {
  type: typeof ROUTER_CALL_HISTORY_METHOD
  payload: {
    method: M
    args: Parameters<History[M]>,
  }
}

function updateLocation<M extends Methods = Methods>(method: M) {
  return (...args: Parameters<History[M]>): UpdateLocationAction<M> => ({
    type: ROUTER_CALL_HISTORY_METHOD,
    payload: { method: method, args },
  })
}

/**
 * These actions correspond to the history API.
 * The associated routerMiddleware will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */
export const push = updateLocation('push')
export const replace = updateLocation('replace')
export const go = updateLocation('go')
export const back = updateLocation('back')
export const forward = updateLocation('forward')

export const routerActions = {
  push,
  replace,
  go,
  back,
  forward,
}

export type RouterActions = LocationChangeAction | UpdateLocationAction


// Middleware

export function createRouterMiddleware(history: History): Middleware {
  return () => next => (action: ReturnType<typeof push & typeof replace & typeof go & typeof back & typeof forward>) => {
    if (action.type !== ROUTER_CALL_HISTORY_METHOD) {
      return next(action)
    }
    history[action.payload.method](...action.payload.args)
  }
}


// Reducer

export type ReduxRouterState = {
  location: Location
  action: Action
}

export function createRouterReducer(history: History): Reducer<ReduxRouterState, RouterActions> {
  const initialRouterState: ReduxRouterState = {
    location: history.location,
    action: history.action,
  }

  /*
  * This reducer will update the state with the most recent location history
  * has transitioned to.
  */
  return (state = initialRouterState, action: RouterActions) => {
    if (action.type === ROUTER_ON_LOCATION_CHANGED) {
      return { ...state, ...action.payload }
    }

    return state
  }
}

export type ReduxRouterSelector = (store: Store) => ReduxRouterState

export function reduxRouterSelector(state: any): ReduxRouterState {
  return state.router
}


// Component

type Props = {
  store: Store
  history: History
  basename?: string
  children: React.ReactNode
  enableTimeTravelling: boolean
  routerSelector: ReduxRouterSelector
}

type State = {
  action: Action
  location: Location
}

export class ReduxRouter extends React.Component<Props, State> {
  removeHistoryListener?: Function
  removeStoreSubscription?: Function
  timeTravelling: boolean = false

  static defaultProps = {
    enableTimeTravelling: process.env.NODE_ENV === 'development',
    routerSelector: reduxRouterSelector,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      action: props.history.action,
      location: props.history.location,
    }

    if (this.props.enableTimeTravelling === true) {
      // Subscribe to store changes to check if we are in time travelling
      this.removeStoreSubscription = props.store.subscribe(() => {

        // Extract store's location and browser location
        const locationInStore = props.routerSelector(props.store.getState()).location
        const historyLocation = props.history.location

        // If we do time travelling, the location in store is changed but location in history is not changed
        if (
          props.history.action === 'PUSH' &&
          (
            historyLocation.pathname !== locationInStore.pathname ||
            historyLocation.search !== locationInStore.search ||
            historyLocation.hash !== locationInStore.hash ||
            historyLocation.state !== locationInStore.state
          )
        ) {
          this.timeTravelling = true
          props.history.push(locationInStore)
        }
      })
    }
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>): boolean {
    return this.state.location.key !== nextState.location.key
  }

  componentDidMount() {
    // Listen to history changes
    this.removeHistoryListener = this.props.history.listen(({ location, action }) => {
      if (this.timeTravelling === false) {
        this.props.store.dispatch(onLocationChanged(location, action))
      } else {
        this.timeTravelling = false
      }
      this.setState({ action, location })
    })
  }

  componentWillUnmount() {
    if (this.removeHistoryListener !== undefined) {
      this.removeHistoryListener()
    }
    if (this.removeStoreSubscription !== undefined) {
      this.removeStoreSubscription()
    }
  }

  render() {
    return (
      <Router
        navigationType={this.state.action}
        location={this.state.location}
        basename={this.props.basename}
        navigator={this.props.history}
        children={this.props.children}
      />
    )
  }
}
