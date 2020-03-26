import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  configUrl='http://localhost:8080/ers/Login';
  constructor(
    private http: HttpClient,
  ) { }
  sendLogin(username: string, password: string): Observable<User>{
    const loginTemplate = {
      username: username,
      password: password,
    }
    return this.http.post<User>(this.configUrl,loginTemplate);
  }
}
