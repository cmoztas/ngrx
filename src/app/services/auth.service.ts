import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthResponseModel} from '../models/authResponse.model';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  timeoutInterval: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  login(email: string, password: string): Observable<AuthResponseModel> {
    return this.httpClient.post<AuthResponseModel>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      {email, password, returnSecureToken: true});
  }

  signUp(email: string, password: string): Observable<AuthResponseModel> {
    return this.httpClient.post<AuthResponseModel>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
      {email, password, returnSecureToken: true});
  }

  formatUser(data: AuthResponseModel) {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    return new User(data.email, data.idToken, data.localId, expirationDate);
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found.';
      case 'INVALID_PASSWORD':
        return 'Invalid password.';
      case 'USER_DISABLED':
        return 'This user is banned from system.';
      case 'EMAIL_EXISTS':
        return 'The email address is already in use by another account.';
      case 'OPERATION_NOT_ALLOWED':
        return 'Password sign-in is disabled for this project.';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'We have blocked all requests from this device due to unusual activity. Try again later.';
      default:
        return 'Unknown error occured. Please try again.';
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todayDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todayDate;

    this.timeoutInterval = setTimeout(() => {
      // logout functionality or get the refresh token
    }, timeInterval)
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(userData.email, userData.token, userData.localId, expirationDate);
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }
}
