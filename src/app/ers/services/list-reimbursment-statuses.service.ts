import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ReimbursmentStatus} from '../models/reimbursmentStatus';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListReimbursmentStatusesService {
  configUrl='http://localhost:8080/ers/ReimbursmentStatusList';
  constructor(
    private http: HttpClient,
  ) { }
  sendListRequest(): Observable<ReimbursmentStatus[]>{
    return this.http.get<ReimbursmentStatus[]>(this.configUrl);
  }
}
