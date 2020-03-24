import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ReimbursmentType} from '../models/reimbursmentType';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListReimbursmentTypesService {
  configUrl='http://localhost:8080/PhilipLawrence1Expenses/ReimbursmentTypeList';
  constructor(
    private http: HttpClient,
  ) { }
  sendListRequest(): Observable<ReimbursmentType[]>{
    return this.http.get<ReimbursmentType[]>(this.configUrl);
  }
}
