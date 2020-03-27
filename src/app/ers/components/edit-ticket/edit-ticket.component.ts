import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { ReimbursmentType } from '../../models/reimbursmentType';
import { ListReimbursmentTypesService } from '../../services/list-reimbursment-types.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Reimbursment } from '../../models/reimbursment';
import { ReimbursmentService } from '../../services/reimbursment.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.sass']
})
export class EditTicketComponent implements OnInit {
  user = this.storage.get<User>('userLogin');
  reimbursment: Observable<Reimbursment>;
  types: Observable<ReimbursmentType[]>;
  receiptURL: SafeUrl;
  receipt: File;
  retrievedReceiptURL: Blob;
  constructor(
    private listReimbursmentTypesService: ListReimbursmentTypesService,
    private storage: StorageMap,
    private reimbursmentService: ReimbursmentService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.callReimbursmentTypes();
    this.storage.get<User>('userLogin').subscribe((res: User) => {
      this.reimbursment = this.route.paramMap.pipe(
        switchMap((params:ParamMap)=>
          this.reimbursmentService.get(res,+params.get('id'))))
    });
  }
  retrieve(){
    console.log("retrieve!");
    this.reimbursment.subscribe((reimbursment)=>{
      this.user.subscribe((user)=>{
        console.log(user);
        this.reimbursmentService.getReceipt(user, reimbursment.id).subscribe((result: Blob)=>{
          console.log(result);
          this.retrievedReceiptURL = result;
        })
      });
    });
  }
  sanitizeReceipt(){
    this.reimbursment.subscribe((res)=>{
      if(this.receipt != undefined){
        let url = URL.createObjectURL(this.receipt);
        this.receiptURL = this.sanitizer.bypassSecurityTrustUrl(url);
      }
    });
  }
  callReimbursmentTypes(){
    this.types = this.listReimbursmentTypesService.sendListRequest();
  }
  submit(){
  }
  onFileChanged(event){
    this.reimbursment.subscribe((res)=>{
      this.receipt = event.target.files[0];
      console.log(this.receipt);
      this.sanitizeReceipt();
    });
  }
  onUpload(){
    this.reimbursment.subscribe((reimbursment)=>{
      console.log("made it");
      console.log(this.receipt);
      this.user.subscribe((user)=>{
        this.reimbursmentService.updateReceipt(user, reimbursment.id, this.receipt).subscribe((result)=>
        console.log(result));
      })
    });
    // console.log(this.blobToString(this.selectedFile));
  }
  blobToString(blob: Blob): string{
    var url, xml;
    url = URL.createObjectURL(blob);
    xml = new XMLHttpRequest();
    xml.open('GET',url,false);
    xml.send();
    URL.revokeObjectURL(url);
    return xml.responseText;
  }
}
