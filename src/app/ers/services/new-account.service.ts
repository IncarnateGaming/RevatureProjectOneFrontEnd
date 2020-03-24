import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewAccountService {
  configUrl='http://localhost:8080/PhilipLawrence1Expenses/NewAccount';
  constructor(
    private http: HttpClient,
  ) { }
  create(username: string, password: string, email: string): Observable<User>{
    const newAccountTemplate = {
      username: username,
      password: password,
      email: email,
    }
    return this.http.post<User>(this.configUrl,newAccountTemplate);
  }
}
