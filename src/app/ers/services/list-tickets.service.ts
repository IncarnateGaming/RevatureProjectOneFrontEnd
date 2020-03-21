import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../models/user';
import {ReimbursmentStatus} from '../models/reimbursmentStatus';
import {Reimbursment} from '../models/reimbursment';
import { StorageMap } from '@ngx-pwa/local-storage';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListTicketsService {
  configUrl='http://localhost:8080/PhilipLawrence0Bank-Maven/ReimbursmentList';
  constructor(
    private http: HttpClient,
    private storage: StorageMap,
  ) { }

  sendListRequest(submitter: User, filterBy: User, limit: number, offset: number, status: ReimbursmentStatus): Observable<Reimbursment[]>{
    const listTicketTemplate = {
      submitter: submitter,
      filterBy: filterBy,
      limit: limit,
      offset: offset,
      status: status,
    };
    return this.http.post<Reimbursment[]>(this.configUrl,listTicketTemplate);
  }
}
