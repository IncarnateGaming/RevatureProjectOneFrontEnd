import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { ReimbursmentType } from '../../models/reimbursmentType';
import { ListReimbursmentTypesService } from '../../services/list-reimbursment-types.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Reimbursment } from '../../models/reimbursment';
import { ReimbursmentService } from '../../services/reimbursment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.sass']
})
export class NewTicketComponent implements OnInit {

  user = this.storage.get<User>('userLogin');
  amount: number;
  description: string;
  type: string;
  receipt: Blob;
  types: Observable<ReimbursmentType[]>;
  selectedFile: File;
  constructor(
    private listReimbursmentTypesService: ListReimbursmentTypesService,
    private storage: StorageMap,
    private reimbursmentService: ReimbursmentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.callReimbursmentTypes();
  }
  callReimbursmentTypes(){
    this.types = this.listReimbursmentTypesService.sendListRequest();
  }
  submit(){
    this.storage.get<User>('userLogin').subscribe((res: User) => {
      console.log("amount", this.amount, "description", this.description, "type", this.type);
      let type: ReimbursmentType = new ReimbursmentType("");
      if(this.type !== undefined && this.type !== ""){
        type = JSON.parse(this.type);
        let reimbursment: Reimbursment = new Reimbursment(this.amount, this.description, this.receipt, res, type);
        this.reimbursmentService.create(res, reimbursment)
          .subscribe((result) => {
            console.log(result);
            this.router.navigate(['/ticket/edit/', result.id]);
          })
      }else{
        alert("Type is a required field.");
      }
    })
  }
  onFileChanged(event){
    this.selectedFile = event.target.files[0];
  }
  onUpload(){
    console.log(this.selectedFile);
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
