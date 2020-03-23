import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../models/user';
import { StorageMap } from '@ngx-pwa/local-storage';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListUsersService {
  configUrl = 'http://localhost:8080/PhilipLawrence1Expenses/UsersList';
  constructor(
    private http: HttpClient,
    private storage: StorageMap,
  ) { }

  sendListRequest(submitter: User, limit: number, offset: number): Observable<User[]> {
    const listTicketTemplate = {
      submitter,
      limit,
      offset,
    };
    return this.http.post<User[]>(this.configUrl, listTicketTemplate);
  }
}
