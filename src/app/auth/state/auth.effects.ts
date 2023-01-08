import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loginStart, loginSuccess} from './auth.actions';
import {catchError, exhaustMap, map, of, tap} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {AuthResponseModel} from '../../models/authResponse.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {setErrorMessage, setLoadingSpinner} from '../../store/Shared/shared.actions';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects{
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService
          .login(action.email, action.password).pipe(
            map((data: AuthResponseModel) => {
              this.store.dispatch(setLoadingSpinner({status: false}));
              this.store.dispatch(setErrorMessage({message: ''}));
              const user = this.authService.formatUser(data);
              return loginSuccess({user});
            }),
            catchError((errorResponse) => {
              this.store.dispatch(setLoadingSpinner({status: false}));
              const errorMessage = this.authService.getErrorMessage(errorResponse.error.error.message);
              return of(
                setErrorMessage({message: errorMessage})
              );
            })
          )
      })
    )
  });

  loginRedirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this.router.navigate(['/']).then();
        })
      )
    },
    {dispatch: false}
  );
}
