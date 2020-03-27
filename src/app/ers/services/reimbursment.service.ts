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
          var blob = new Blob([xhr.response],{type:"image/jpeg"});
          console.log(blob);
          var urlCreator = window.URL || window.webkitURL;
          var imageURL = urlCreator.createObjectURL(blob);
          const image = <HTMLImageElement> document.getElementById("receiptImage");
          observer.next(imageURL);
        }
      })
      xhr.send();
    })
    return observable;
    /**====================== */
    // let url: any = new URL(this.blobUrl);
    // url.searchParams.set('submitter',JSON.stringify(submitter));
    // url.searchParams.set('reimbursmentid',reimbursmentId.toString())
    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", url, true);
    // xhr.responseType = 'blob';
    // xhr.addEventListener('load',function(){
    //   if (xhr.status === 200){
    //     const image = <HTMLImageElement> document.getElementById("receiptImage");
    //     if(image != undefined){
    //       var blob = new Blob([xhr.response],{type:"image/jpeg"});
    //       console.log(blob);
    //       var urlCreator = window.URL || window.webkitURL;
    //       var imageURL = urlCreator.createObjectURL(blob);
    //       console.log(imageURL);
    //       const image = <HTMLImageElement> document.getElementById("receiptImage");
    //       // var safeURL: any = sanitizer.bypassSecurityTrustUrl(imageURL);
    //       // console.log(safeURL);
    //       image.src = imageURL;
    //     }
    //   }
    // })
    // xhr.send();
    /*======================*/
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
    let url: any = new URL(this.blobUrl);
    url.searchParams.set('submitter',JSON.stringify(submitter));
    url.searchParams.set('reimbursmentid',reimbursmentId.toString())
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.responseType = 'text';
    xhr.addEventListener('load',function(){
      if (xhr.status === 201){
        console.log("201 response");
        console.log(this.responseText);
        console.log(xhr.response);
      }
    })
    xhr.send(blob);
    // console.log(blob.type);
    // return this.http.put(this.blobUrl,
    //   blob,
    //   {
    //     headers:{
    //       "Content-Type":blob.type,
    //     },
    //     params:{
    //       submitter: JSON.stringify(submitter),
    //       mimeType: blob.type,
    //       reimbursmentId: reimbursmentId.toString(),
    //     }
    //   }
    //   )
  }
}
