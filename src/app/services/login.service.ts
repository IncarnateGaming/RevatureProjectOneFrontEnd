import { Injectable } from '@angular/core';
import { LoginTemplate } from '../templates/loginTemplate';
import {AppModule} from '../app.module';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  configUrl='http://localhost:8080/PhilipLawrence0Bank-Maven/Login';
  constructor() { }
  sendLogin(username: string, password: string): Observable<User>{
    const loginTemplate: LoginTemplate{
      username: username,
      password: password,
    }
    return this.http.post<LoginTemplate>(this.configUrl,loginTemplate);
  }
}
