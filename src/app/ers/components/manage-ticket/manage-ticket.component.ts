import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ReimbursmentService } from '../../services/reimbursment.service';
import { ListReimbursmentStatusesService } from '../../services/list-reimbursment-statuses.service';
import { Reimbursment } from '../../models/reimbursment';
import { switchMap } from 'rxjs/operators';
import { ReimbursmentStatus } from '../../models/reimbursmentStatus';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-ticket',
  templateUrl: './manage-ticket.component.html',
  styleUrls: ['./manage-ticket.component.sass']
})
export class ManageTicketComponent implements OnInit {

  user = this.storage.get<User>('userLogin');
  reimbursment: Observable<Reimbursment>;
  statuses: Observable<ReimbursmentStatus[]>;
  status: HTMLSelectElement;
  constructor(
    private storage: StorageMap,
    private listReimbursmentStatusesService: ListReimbursmentStatusesService,
    private reimbursmentService: ReimbursmentService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.statuses = this.listReimbursmentStatusesService.sendListRequest();
    this.storage.get<User>('userLogin').subscribe((user: User) => {
      this.reimbursment = this.route.paramMap.pipe(
        switchMap((params:ParamMap)=>
          this.reimbursmentService.get(user,+params.get('id'))
          ));
      this.reimbursment.subscribe((reimbursment)=>{
        this.statuses.subscribe((statuses)=>{
          this.status = <HTMLSelectElement> document.getElementById('status');
          this.status.value = JSON.stringify(reimbursment.status);
        })
        this.reimbursmentService.getReceipt(user, reimbursment.id)
        .subscribe((result)=>{
          let sanUrl = this.sanitizer.bypassSecurityTrustHtml(result);
          console.log(sanUrl);
          let image = <HTMLImageElement> document.getElementById("receiptImage");
          image.src = (<any>sanUrl).changingThisBreaksApplicationSecurity;
        })
      })
    });
  }
  submit(){
    this.reimbursment.subscribe((reimbursment)=>{
      this.storage.get<User>('userLogin').subscribe((res: User) => {
        reimbursment.status = JSON.parse(this.status.value);
        reimbursment.resolver = res;
        this.reimbursmentService.update(res, reimbursment).subscribe(()=>{
          alert("Reimbursment Processed");
        });
      });
    });
  }

}
