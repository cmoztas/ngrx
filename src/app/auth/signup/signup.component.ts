import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {signupStart} from '../state/auth.actions';
import {setLoadingSpinner} from '../../store/Shared/shared.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', Validators.required)
    })
  }

  onSignupSubmit() {
    if (!this.signUpForm.valid) {return;}

    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(signupStart(this.signUpForm.value));
  }
}
