import {Action, createReducer, on} from '@ngrx/store';
import {AuthState, initialState} from './auth.state';
import {loginSuccess, signupSuccess} from './auth.actions';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  }),
  on(signupSuccess, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  })
);

export function authReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
