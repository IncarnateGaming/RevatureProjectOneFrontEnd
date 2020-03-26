import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Reimbursment } from '../models/reimbursment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReimbursmentService {
  private configUrl = "http://localhost:8080/PhilipLawrence1Expenses/Reimbursment";
  private getUrl = "http://localhost:8080/PhilipLawrence1Expenses/ReimbursmentGet";
  private blobUrl = "http://localhost:8080/PhilipLawrence1Expenses/ReimbursmentBlob";
  constructor(
    private http: HttpClient,
  ) { }
  create(submitter:User, reimbursment:Reimbursment): Observable<Reimbursment>{
    return this.http.post<Reimbursment>(this.configUrl,{submitter:submitter, reimbursment:reimbursment});
  }
  update(submitter:User, reimbursment:Reimbursment): Observable<Reimbursment>{
    return this.http.put<Reimbursment>(this.configUrl,{submitter:submitter, reimbursment:reimbursment});
  }
  get(submitter:User, reimbursmentId: number): Observable<Reimbursment>{
    let reimbursment: Reimbursment = new Reimbursment(0,"",undefined,{email:"",firstName:"",lastName:"",id:0,password:"",role:{id:0,role:""},username:""},{id:0,type:""});
    reimbursment.id = reimbursmentId;
    return this.http.post<Reimbursment>(this.getUrl,{submitter:submitter, reimbursment:reimbursment});
  }
  getReceipt(submitter, reimbursmentId): Observable<any>{
    console.log(submitter);
    return this.http.post<any>(this.blobUrl,
      "",
      {
        params:{
          submitter: JSON.stringify(submitter),
          reimbursmentId: reimbursmentId.toString(),
        },
        observer: 'response',
        responseType: 'blob',
      });
  }
  updateReceipt(submitter, reimbursmentId: number, blob: File){
    return this.http.put(this.blobUrl,
      blob,
      {
        headers:{
          "Content-Type":blob.type,
        },
        params:{
          submitter: JSON.stringify(submitter),
          mimeType: blob.type,
          reimbursmentId: reimbursmentId.toString(),
        }
      }
      )
  }
}
