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
  constructor(
    private httpClient: HttpClient
  ) { }

  login(email: string, password: string): Observable<AuthResponseModel> {
    return this.httpClient.post<AuthResponseModel>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      {email, password, returnSecureToken: true});
  }

  formatUser(data: AuthResponseModel) {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    return new User(data.email, data.idToken, data.localId, expirationDate);
  }
}
