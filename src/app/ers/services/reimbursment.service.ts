import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Reimbursment } from '../models/reimbursment';
import { Observable } from 'rxjs';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ReimbursmentService {
  private configUrl = "http://localhost:8080/ers/Reimbursment";
  private getUrl = "http://localhost:8080/ers/ReimbursmentGet";
  private blobUrl = "http://localhost:8080/ers/ReimbursmentBlob";
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
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
  getReceipt(submitter, reimbursmentId){
    let url: any = new URL(this.blobUrl);
    url.searchParams.set('submitter',JSON.stringify(submitter));
    url.searchParams.set('reimbursmentid',reimbursmentId.toString())
    let observable = Observable.create((observer)=>{
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = 'blob';
      xhr.addEventListener('load',function(){
        if (xhr.status === 200){
          console.log(xhr.response);
          var blob = new Blob([xhr.response],{type:"image/jpeg"});
          var file = new File([blob],  "receipt.jpg");
          console.log(file);
          var urlCreator = window.URL || window.webkitURL;
          var imageURL = urlCreator.createObjectURL(file);
          observer.next(imageURL);
        }
      })
      xhr.send();
    })
    return observable;
  }
  updateReceipt(submitter, reimbursmentId: number, blob: File){
    let url: any = new URL(this.blobUrl);
    url.searchParams.set('submitter',JSON.stringify(submitter));
    url.searchParams.set('reimbursmentid',reimbursmentId.toString())
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.responseType = 'text';
    xhr.addEventListener('load',function(){
      if (xhr.status === 201){
        alert("Updated image");
      }
    })
    xhr.send(blob);
  }
}
