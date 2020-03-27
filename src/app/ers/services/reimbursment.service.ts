import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Reimbursment } from '../models/reimbursment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReimbursmentService {
  private configUrl = "http://localhost:8080/ers/Reimbursment";
  private getUrl = "http://localhost:8080/ers/ReimbursmentGet";
  private blobUrl = "http://localhost:8080/ers/ReimbursmentBlob";
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
  getReceipt(submitter, reimbursmentId){
    let url: any = new URL(this.blobUrl);
    url.searchParams.set('submitter',JSON.stringify(submitter));
    url.searchParams.set('reimbursmentid',reimbursmentId.toString())
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = 'blob';
    xhr.addEventListener('load',function(){
      if (xhr.status === 200){
        const image = <HTMLImageElement> document.getElementById("receiptImage");
        if(image != undefined){
          var blob = new Blob([xhr.response],{type:"image/jpeg"});
          var urlCreator = window.URL || window.webkitURL;
          var imageURL = urlCreator.createObjectURL(blob);
          image.src = imageURL;
        }
      }
    })
    xhr.send();
    // console.log(submitter);
    // const options = {
    //   headers?:{}, 
    //   observe?: 'body',
    //   params:{
    //     submitter: JSON.stringify(submitter),
    //     reimbursmentId: reimbursmentId.toString(),
    //   }, 
    //   responseType: 'text' as 'text'} = {
    //     headers: {},
    //     params: {
    //       submitter: JSON.stringify(submitter),
    //       reimbursmentId: reimbursmentId.toString(),
    //     },
    //     responseType: 'text'
    //   };
    // return this.http.get<any>(this.blobUrl,
    //   options);
  }
  updateReceipt(submitter, reimbursmentId: number, blob: File){
    console.log(blob.type);
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
