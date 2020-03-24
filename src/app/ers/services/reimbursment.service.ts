import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Reimbursment } from '../models/reimbursment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReimbursmentService {
  configUrl = "http://localhost:8080/PhilipLawrence1Expenses/Reimbursment";
  getUrl = "http://localhost:8080/PhilipLawrence1Expenses/ReimbursmentGet";
  constructor(
    private http: HttpClient,
  ) { }
  create(submitter:User, reimbursment:Reimbursment): Observable<Reimbursment>{
    return this.http.post<Reimbursment>(this.configUrl,{submitter:submitter, reimbursment:reimbursment});
  }
  update(submitter:User, reimbursment:Reimbursment): Observable<Reimbursment>{
    return this.http.put<Reimbursment>(this.configUrl,{submitter:submitter, reimbursment:reimbursment});
  }
  get(submitter:User, reimbursment:Reimbursment): Observable<Reimbursment>{
    return this.http.post<Reimbursment>(this.getUrl,{submitter:submitter, reimbursment:reimbursment});
  }
}
