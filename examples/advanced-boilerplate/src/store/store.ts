import { configureStore, } from '@reduxjs/toolkit'
import type { TypedStartListening, } from '@reduxjs/toolkit'
import rootReducer from "./reducer";
import { createRouterMiddleware, ReduxRouterState} from '@lagunovsky/redux-react-router'
import browserHistory from '../history';

const routerMiddleware = createRouterMiddleware( browserHistory )

export const store = configureStore({
  reducer: rootReducer,
  middleware: ( getDefaultMiddleware ) => getDefaultMiddleware().prepend(
    routerMiddleware,
  )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export default store;
