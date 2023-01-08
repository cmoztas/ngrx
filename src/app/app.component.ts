import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './store/app.state';
import {Observable} from 'rxjs';
import {getErrorMessage, getLoading} from './store/Shared/shared.selectors';
import {autoLogin} from './auth/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngrx-counter';
  showLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoading);
    this.errorMessage$ = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
  }
}
