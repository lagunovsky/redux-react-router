import { push } from '@lagunovsky/redux-react-router';
import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { RootState } from '../store';

export type Loading = 'idle' | 'pending' | 'succeeded' | 'failed';
export type Authentication = 'pending' | 'succeeded' | 'failed';

export interface AppState {
  loading: Loading,
  authentication: Authentication,
  currentRequestId: string,
  error: SerializedError | null,
  errorMessage: string,
  redirect: string,
}

const initialState: AppState = {
  loading: 'idle',
  authentication: 'pending',
  currentRequestId: '',
  error: null,
  errorMessage: '',
  redirect: '',
}

interface Credentials {
  username: string,
  password: string,
}

// https://redux-toolkit.js.org/api/createAsyncThunk

export const fetchUser = createAsyncThunk(
  'signIn/fetchUser',
  async ( credentials: Credentials, thunkAPI ) => {
    const state = thunkAPI.getState() as RootState;
    const { currentRequestId, loading } = state.app;

    if (loading !== 'pending' || thunkAPI.requestId !== currentRequestId) return;

    // Fake Auth API
    // Your real authentication logic should go here

    return new Promise<boolean>( ( resolve, reject ) => {

      thunkAPI.dispatch( appSlice.actions.authenticationFailed( '' ) );
      // Fake delay with window.setTimeout

      setTimeout( () => {

        if ( credentials.username === 'foo' && credentials.password === 'bar' ) {
          return resolve( true );
        } else {
          return reject( false );
        }

      }, Math.random() * 1500 + 500 );

    } )
    .then( () => {
      thunkAPI.dispatch( appSlice.actions.authenticated() );
      thunkAPI.dispatch( push( '/settings' ) );
    })
    .catch( error => {

      thunkAPI.dispatch( appSlice.actions.authenticationFailed(
        'Authenication failed. Try "foo" and "bar" for username and password.'
      ) );

    })
  }
)

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    authenticated: ( state )  => {
      state.authentication = 'succeeded';
      state.errorMessage = '';
    },
    authenticationCleared: ( state )  => {
      state.authentication = 'pending';
      state.errorMessage = '';
    },
    authenticationFailed: ( state, action: PayloadAction<string> )  => {
      state.authentication = 'failed';
      state.errorMessage = action.payload;

    },
  },

  // https://redux-toolkit.js.org/api/createAsyncThunk
  extraReducers: ( builder ) => {
    builder.addCase(fetchUser.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if ( state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle'
          state.currentRequestId = ''
        }
      })
      .addCase(fetchUser.rejected, ( state, action, ) => {

        const { requestId } = action.meta

        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle'
          state.error = action.error
          state.currentRequestId = ''
        }
    } )
  },
})

export const {
  authenticationCleared,
} = appSlice.actions

export default appSlice.reducer
