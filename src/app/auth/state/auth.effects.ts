import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loginStart, loginSuccess} from './auth.actions';
import {exhaustMap, map} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {AuthResponseModel} from '../../models/authResponse.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {setLoadingSpinner} from '../../store/Shared/shared.actions';

@Injectable()
export class AuthEffects{
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService
          .login(action.email, action.password)
          .pipe(map((data: AuthResponseModel) => {
            this.store.dispatch(setLoadingSpinner({status: false}));
            const user = this.authService.formatUser(data);
            return loginSuccess({user});
          }))
      })
    )
  })
}
