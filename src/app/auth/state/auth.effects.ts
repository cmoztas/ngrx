import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {autoLogin, loginStart, loginSuccess, signupStart, signupSuccess} from './auth.actions';
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
              this.authService.setUserInLocalStorage(user);
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
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({message: ''}));
          this.router.navigate(['/']).then();
        })
      )
    },
    {dispatch: false}
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data: AuthResponseModel) => {
            this.store.dispatch(setLoadingSpinner({status: false}));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return signupSuccess({user});
          }),
          catchError((errorResponse) => {
            this.store.dispatch(setLoadingSpinner({status: false}));
            const errorMessage = this.authService.getErrorMessage(errorResponse.error.error.message);
            return of(
              setErrorMessage({message: errorMessage})
            )
          })
        )
      })
    )
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      map((action) => {
        const user = this.authService.getUserFromLocalStorage();
        console.log(user);
      })
    )
  },
    {
      dispatch: false
    })
}
