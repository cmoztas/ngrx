import {SHARED_STATE_NAME} from './Shared/shared.selectors';
import {SharedState} from './Shared/shared.state';
import {SharedReducer} from './Shared/shared.reducer';
import {AUTH_STATE_NAME} from '../auth/state/auth.selectors';
import {AuthState} from '../auth/state/auth.state';
import {authReducer} from '../auth/state/auth.reducer';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState,
  [AUTH_STATE_NAME]: AuthState
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: authReducer
}
